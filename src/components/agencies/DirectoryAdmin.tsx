import { useEffect,useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { loadDirectoryAdmin,saveDirectoryAgency,qualifyDirectoryRequest,selectDirectoryRecipient,deliverDirectoryOpportunity } from '@/lib/directory-admin.functions';
import { compatibleAgencies } from '@/lib/agency-matching';
import { COVERAGE_CITIES,CATEGORIES } from '@/lib/catalog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type AdminData=Awaited<ReturnType<typeof loadDirectoryAdmin>>;
export default function DirectoryAdmin(){
  const load=useServerFn(loadDirectoryAdmin),save=useServerFn(saveDirectoryAgency),qualify=useServerFn(qualifyDirectoryRequest),select=useServerFn(selectDirectoryRecipient);
  const deliver=useServerFn(deliverDirectoryOpportunity);
  const [data,setData]=useState<AdminData|null>(null),[message,setMessage]=useState(''),[signedIn,setSignedIn]=useState(false),[slug,setSlug]=useState('meta-assurances-et-conseils');
  const refresh=async()=>{try{setData(await load());setMessage('');}catch{setMessage('Accès réservé aux administrateurs habilités.');}};
  useEffect(()=>{supabase.auth.getSession().then(({data:{session}})=>{setSignedIn(Boolean(session));if(session)void refresh();});const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{if(event==='SIGNED_IN'){setSignedIn(true);void refresh();}if(event==='SIGNED_OUT'){setSignedIn(false);setData(null);}});return()=>subscription.unsubscribe();},[]);
  const agency=data?.agencies.find(a=>a.slug===slug);
  return <div className="brand-v2 min-h-dvh bg-paper text-ink"><main className="mx-auto max-w-6xl px-5 py-10">
    <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="font-display text-3xl">Gestion de l’annuaire Page.ma</h1>{signedIn&&<Button variant="outline" onClick={async()=>{await supabase.auth.signOut();setData(null);}}>Déconnexion</Button>}</div>
    {!signedIn&&<div className="mt-8 flex flex-wrap gap-3">{(['google','lovable'] as const).map(provider=><Button key={provider} onClick={async()=>{const result=await lovable.auth.signInWithOAuth(provider,{redirect_uri:window.location.origin+'/gestion-annuaire'});if(result.error)setMessage('Connexion impossible');}}>Se connecter avec {provider==='google'?'Google':'Lovable'}</Button>)}</div>}
    {message&&<p role="status" className="my-5">{message}</p>}
    {data&&agency&&<>
      <label className="mt-8 block text-sm">Agence<select aria-label="Agence" value={slug} onChange={e=>setSlug(e.target.value)} className="ms-3 rounded-md border border-input bg-background p-2">{data.agencies.map(a=><option key={a.slug} value={a.slug}>{a.name}</option>)}</select></label>
      <form key={slug} className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={async e=>{e.preventDefault();const f=new FormData(e.currentTarget);const v=(k:string)=>String(f.get(k)??'');try{await save({data:{slug,name:v('name'),name_ar:v('name_ar'),trade_name:v('trade_name'),activity_fr:v('activity_fr'),activity_ar:v('activity_ar'),summary_fr:v('summary_fr'),summary_ar:v('summary_ar'),description_fr:v('description_fr'),description_ar:v('description_ar'),phone:v('phone'),email:v('email'),website:v('website'),logo_url:v('logo_url'),cover_url:v('cover_url'),address:v('address'),address_ar:v('address_ar'),city:v('city'),coverage_cities:f.getAll('coverage').map(String),services:f.getAll('category').map(String),offering_slugs:f.getAll('offering').map(String),published:f.has('published')}});await refresh();setMessage('Fiche enregistrée');}catch{setMessage('Enregistrement impossible');}}}>
        {(['name','name_ar','trade_name','activity_fr','activity_ar','phone','email','website','address','address_ar','city','logo_url','cover_url','summary_fr','summary_ar','description_fr','description_ar'] as const).map(k=><label key={k} className="text-sm">{{name:'Nom',name_ar:'Nom arabe',trade_name:'Nom commercial',activity_fr:'Activité FR',activity_ar:'Activité AR',phone:'Téléphone',email:'Email',website:'Site officiel',address:'Adresse FR',address_ar:'Adresse AR',city:'Ville',logo_url:'Logo',cover_url:'Photo',summary_fr:'Résumé FR',summary_ar:'Résumé AR',description_fr:'Présentation FR',description_ar:'Présentation AR'}[k]}{k.includes('description')||k.includes('summary')?<Textarea name={k} defaultValue={agency[k]??''} dir={k.endsWith('_ar')?'rtl':'ltr'}/>:<Input name={k} defaultValue={agency[k]??''} dir={k.endsWith('_ar')?'rtl':'ltr'}/>}</label>)}
        <fieldset className="sm:col-span-2"><legend>Catégories</legend><div className="mt-2 flex flex-wrap gap-4">{CATEGORIES.map(c=><label key={c} className="text-sm"><input type="checkbox" name="category" value={c} defaultChecked={agency.services.includes(c)}/> {c}</label>)}</div></fieldset>
        <fieldset className="sm:col-span-2"><legend>Zones d’intervention confirmées</legend><div className="mt-2 flex flex-wrap gap-4">{COVERAGE_CITIES.map(c=><label key={c} className="text-sm"><input type="checkbox" name="coverage" value={c} defaultChecked={agency.coverage_cities.includes(c)}/> {c}</label>)}</div></fieldset>
        <fieldset className="sm:col-span-2"><legend>Prestations</legend><div className="mt-2 grid gap-3 sm:grid-cols-2">{data.offerings.map(o=><label key={o.slug} className="text-sm"><input type="checkbox" name="offering" value={o.slug} defaultChecked={data.links.some(l=>l.agency_slug===slug&&l.offering_slug===o.slug)}/> {o.label_fr}</label>)}</div></fieldset>
        <label className="text-sm"><input name="published" type="checkbox" defaultChecked={agency.published}/> Fiche publique</label>
        <Button type="submit">Enregistrer la fiche</Button>
      </form>
      <section className="mt-12 border-t border-ink/20 pt-8"><h2 className="font-display text-2xl">Demandes à qualifier</h2>{data.requests.length===0&&<p className="mt-4">Aucune demande</p>}{data.requests.map(req=>{
        const selected=data.recipients.filter(r=>r.opportunity_id===req.id);
        const matches=compatibleAgencies(data.agencies.map(a=>({...a,offering_slugs:data.links.filter(l=>l.agency_slug===a.slug).map(l=>l.offering_slug)})),req.offering_slug,req.city);
        return <article key={req.id} className="mt-6 border-b border-ink/20 pb-6"><h3 className="font-semibold">{req.full_name} — {req.city}</h3><p>{data.offerings.find(o=>o.slug===req.offering_slug)?.label_fr}</p><p className="mt-2 whitespace-pre-line">{req.need_details}</p><p className="mt-2">{req.phone} · {req.email}</p><p className="text-sm text-ink-soft">{req.status} · {selected.length}/3 agences sélectionnées</p>
          {req.status==='pending'&&<form className="mt-3 flex flex-col gap-3" onSubmit={async e=>{e.preventDefault();const notes=String(new FormData(e.currentTarget).get('notes')??'');try{await qualify({data:{id:req.id,notes}});await refresh();}catch{setMessage('Qualification impossible');}}}><Textarea aria-label="Notes de qualification" name="notes" required placeholder="Notes de qualification"/><Button type="submit">Confirmer la qualification</Button></form>}
          {req.status==='qualified'&&<div className="mt-3 space-y-2">{matches.map(a=><div key={a.slug} className="flex flex-wrap items-center gap-3"><span>{a.name}</span><Button disabled={selected.some(r=>r.agency_slug===a.slug)||selected.length>=3} onClick={async()=>{try{await select({data:{id:req.id,slug:a.slug}});await refresh();}catch{setMessage('Sélection refusée');}}}>Sélectionner</Button>{selected.some(r=>r.agency_slug===a.slug)&&<Button variant="outline" disabled={Boolean(selected.find(r=>r.agency_slug===a.slug)?.delivered_at)||!data.agencies.find(row=>row.slug===a.slug)?.email} onClick={async()=>{try{await deliver({data:{id:req.id,slug:a.slug}});await refresh();setMessage('Opportunité envoyée');}catch{setMessage('Envoi impossible');}}}>{selected.find(r=>r.agency_slug===a.slug)?.delivered_at?'Envoyée':'Envoyer par email'}</Button>}</div>)}</div>}
        </article>;
      })}</section>
    </>}
  </main></div>;
}