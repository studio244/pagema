import { createFileRoute } from '@tanstack/react-router';
import DirectoryAdmin from '@/components/agencies/DirectoryAdmin';
import { seoHead } from '@/lib/seo';
export const Route=createFileRoute('/gestion-annuaire')({
  staticData:{sitemap:false},
  head:()=>seoHead({lang:'fr',paths:{fr:'/gestion-annuaire',ar:'/gestion-annuaire'},title:'Gestion de l’annuaire | Page.ma',description:'Gestion privée des fiches et qualification des demandes Page.ma.',noindex:true}),
  component:DirectoryAdmin,
});