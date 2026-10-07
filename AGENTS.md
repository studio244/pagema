<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- Structured data for a page is emitted as one JSON-LD `<script>` block using `@graph`
  (see `seoHead` in `src/lib/seo.ts`): the router's head handling collapses multiple
  `application/ld+json` scripts with identical attributes after hydration, which silently
  drops nodes such as `Organization`.
- Landing pages keep their copy in a bilingual `copy.ts` next to the page component and
  their head metadata in a sibling `route.ts`, so French and Arabic twins stay paired and
  hreflang stays correct.
