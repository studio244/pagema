import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

export const loadDirectoryAdmin = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async ({context})=>{
  const {data:allowed}=await context.supabase.rpc('is_directory_admin');
  if(!allowed) throw new Error('Accès réservé aux administrateurs');
  const [agencies,offerings,links,requests,recipients]=await Promise.all([
    context.supabase.from('agencies').select('*').order('sort_order'),
    context.supabase.from('agency_offerings').select('*').order('label_fr'),
    context.supabase.from('agency_offering_links').select('*'),
    context.supabase.from('agency_opportunities').select('*').order('created_at',{ascending:false}).limit(100),
    context.supabase.from('agency_opportunity_recipients').select('*')
  ]);
  if([agencies,offerings,links,requests,recipients].some(r=>r.error)) throw new Error('Gestion indisponible');
  return {agencies:agencies.data??[],offerings:offerings.data??[],links:links.data??[],requests:requests.data??[],recipients:recipients.data??[]};
});
const nullable=z.string().max(4000).nullable();
const agencySchema=z.object({slug:z.string().max(120),name:z.string().min(1).max(120),name_ar:nullable,trade_name:nullable,activity_fr:nullable,activity_ar:nullable,summary_fr:nullable,summary_ar:nullable,description_fr:nullable,description_ar:nullable,phone:nullable,email:z.union([z.string().email(),z.literal('')]).nullable(),website:z.union([z.string().url(),z.literal('')]).nullable(),logo_url:nullable,cover_url:nullable,address:nullable,address_ar:nullable,city:nullable,coverage_cities:z.array(z.string().max(80)),services:z.array(z.string().max(80)),published:z.boolean(),offering_slugs:z.array(z.string().max(120))});
export const saveDirectoryAgency=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>agencySchema.parse(input)).handler(async({data,context})=>{
  const {data:allowed}=await context.supabase.rpc('is_directory_admin'); if(!allowed)throw new Error('Accès refusé');
  const {slug,offering_slugs,...fields}=data;
  const {data:catalog,error:catalogError}=await context.supabase.from('agency_offerings').select('*').in('slug',offering_slugs);
  if(catalogError || catalog?.length!==new Set(offering_slugs).size)throw new Error('Prestations invalides');
  const update={...fields,updated_at:new Date().toISOString(),...(offering_slugs.length?{offerings_fr:catalog.map(o=>o.label_fr),offerings_ar:catalog.map(o=>o.label_ar)}:{})};
  const {error}=await context.supabase.from('agencies').update(update).eq('slug',slug); if(error)throw new Error('Enregistrement impossible');
  const {error:remove}=await context.supabase.from('agency_offering_links').delete().eq('agency_slug',slug);if(remove)throw new Error('Prestations non enregistrées');
  if(offering_slugs.length){const {error:insert}=await context.supabase.from('agency_offering_links').insert(offering_slugs.map(offering_slug=>({agency_slug:slug,offering_slug})));if(insert)throw new Error('Prestations non enregistrées');}
  return {ok:true};
});
export const qualifyDirectoryRequest=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({id:z.string().uuid(),notes:z.string().min(1).max(2000)}).parse(input)).handler(async({data,context})=>{
  const {data:allowed}=await context.supabase.rpc('is_directory_admin');if(!allowed)throw new Error('Accès refusé');
  const {error}=await context.supabase.from('agency_opportunities').update({status:'qualified',qualification_notes:data.notes}).eq('id',data.id);if(error)throw new Error('Qualification impossible');return {ok:true};
});
export const selectDirectoryRecipient=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({id:z.string().uuid(),slug:z.string().max(120)}).parse(input)).handler(async({data,context})=>{
  const {data:allowed}=await context.supabase.rpc('is_directory_admin');if(!allowed)throw new Error('Accès refusé');
  const {error}=await context.supabase.from('agency_opportunity_recipients').insert({opportunity_id:data.id,agency_slug:data.slug});if(error)throw new Error('Sélection refusée : qualification, compatibilité ou limite de trois agences');return {ok:true};
});
export const deliverDirectoryOpportunity=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({id:z.string().uuid(),slug:z.string().max(120)}).parse(input)).handler(async({data,context})=>{
  const {data:allowed}=await context.supabase.rpc('is_directory_admin');if(!allowed)throw new Error('Accès refusé');
  const [recipient,request,agency]=await Promise.all([
    context.supabase.from('agency_opportunity_recipients').select('*').eq('opportunity_id',data.id).eq('agency_slug',data.slug).single(),
    context.supabase.from('agency_opportunities').select('*').eq('id',data.id).single(),
    context.supabase.from('agencies').select('email,published,coverage_cities').eq('slug',data.slug).single()
  ]);
  if(recipient.error||request.error||agency.error||!recipient.data||!request.data||!agency.data?.email||request.data.status!=='qualified'||!agency.data.published||!agency.data.coverage_cities.includes(request.data.city))throw new Error('Envoi non autorisé');
  const {data:link}=await context.supabase.from('agency_offering_links').select('offering_slug').eq('agency_slug',data.slug).eq('offering_slug',request.data.offering_slug).maybeSingle();if(!link)throw new Error('Prestation incompatible');
  if(recipient.data.delivered_at)return {ok:true};
  const key=process.env['RESEND_API_KEY'];if(!key)throw new Error('Envoi indisponible');
  const req=request.data;
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json','Idempotency-Key':`opportunity-${data.id}-${data.slug}`},body:JSON.stringify({from:'Page.ma <contact@page.ma>',to:[agency.data.email],reply_to:req.email,subject:`Demande qualifiée Page.ma — ${req.city}`,text:`Prestation : ${req.offering_slug}\nVille : ${req.city}\nBesoin : ${req.need_details}\nContact : ${req.full_name}\nTéléphone : ${req.phone}\nEmail : ${req.email}`})});
  if(!response.ok)throw new Error('Envoi impossible');
  const {error}=await context.supabase.from('agency_opportunity_recipients').update({delivered_at:new Date().toISOString()}).eq('opportunity_id',data.id).eq('agency_slug',data.slug);if(error)throw new Error('Envoi effectué, confirmation non enregistrée');return {ok:true};
});