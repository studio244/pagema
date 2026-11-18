import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';
import { sendPreregistrationEmail } from '@/lib/notify.functions';
import { DICTS, type Lang } from '@/lib/i18n';
import { COVERAGE_CITIES } from '@/lib/catalog';
import type { AgencyOffering } from '@/lib/agencies';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AgencyRequestForm({lang, offerings, sourceAgency, defaultOffering, defaultCity='Marrakech'}: {lang: Lang; offerings: AgencyOffering[]; sourceAgency?: string; defaultOffering?: string; defaultCity?: string}) {
  const t = DICTS[lang].form;
  const [status,setStatus] = useState('idle');
  const notify = useServerFn(sendPreregistrationEmail);
  const ar = lang==='ar';
  return <section id="demande-devis" className="mt-10 scroll-mt-24 border-t border-ink/20 pt-8">
    <h2 className="font-display text-2xl">{ar?'طلب عرض سعر عبر Page.ma':'Demander un devis via Page.ma'}</h2>
    <ol className="my-5 grid gap-3 text-sm text-ink-soft sm:grid-cols-4">
      {(ar?['تصف حاجتك','يتحقق Page.ma من الطلب','اختيار الوكالات المتوافقة','إرسال الفرصة إلى ثلاث وكالات كحد أقصى']:['Vous décrivez votre besoin','Page.ma qualifie la demande','Sélection des agences compatibles','Transmission à trois agences maximum']).map((s,i)=><li key={s}>{i+1}. {s}</li>)}
    </ol>
    {status==='done'?<p role="status" className="py-8 text-ink">{ar?'تم تسجيل طلبك. سيتواصل معك Page.ma لتأهيله قبل اختيار الوكالات المناسبة.':'Votre demande est enregistrée. Page.ma vous contactera pour la qualifier avant de sélectionner les agences compatibles.'}</p>:<form className="grid gap-4 sm:grid-cols-2" onSubmit={async e=>{
      e.preventDefault(); setStatus('sending'); const f=new FormData(e.currentTarget);
      const value=(k:string)=>String(f.get(k)??'').trim();
      const id=crypto.randomUUID();
      const payload={id,full_name:value('name'),phone:value('phone'),email:value('email'),city:value('city'),offering_slug:value('offering'),need_details:value('need'),source_agency:sourceAgency??null};
      const {error}=await supabase.from('agency_opportunities').insert(payload);
      if(error){setStatus('error');return;}
      setStatus('done');
      try {await notify({data:{profile:'client',fullName:payload.full_name,phone:payload.phone,email:payload.email,city:payload.city,category:'Assurance',needDetails:`${payload.offering_slug} — ${payload.need_details}`,source:`Demande annuaire ${id}`}});} catch {console.warn('Notification indisponible, demande enregistrée');}
    }}>
      <label className="text-sm">{t.yourName}<Input name="name" required maxLength={120}/></label>
      <label className="text-sm">{t.phone}<Input name="phone" type="tel" dir="ltr" required minLength={6} maxLength={40}/></label>
      <label className="text-sm">{t.email}<Input name="email" type="email" dir="ltr" required maxLength={160}/></label>
      <label className="text-sm">{t.city}<select name="city" defaultValue={defaultCity} className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3" required>{COVERAGE_CITIES.map(c=><option key={c} value={c}>{DICTS[lang].cityLabels[c]??c}</option>)}</select></label>
      <label className="text-sm sm:col-span-2">{ar?'نوع التأمين':'Prestation d’assurance'}<select name="offering" defaultValue={defaultOffering} required className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3">{offerings.map(o=><option key={o.slug} value={o.slug}>{ar?o.label_ar:o.label_fr}</option>)}</select></label>
      <label className="text-sm sm:col-span-2">{ar?'تفاصيل حاجتك':'Décrivez votre besoin'}<Textarea name="need" required minLength={10} maxLength={2000} rows={4}/></label>
      <Button type="submit" disabled={status==='sending'} className="h-auto whitespace-normal py-3 sm:col-span-2">{status==='sending'?t.sending:ar?'إرسال طلبي':'Envoyer ma demande'}</Button>
      {status==='error'&&<p role="alert" className="text-destructive sm:col-span-2">{t.error}</p>}
    </form>}
  </section>;
}