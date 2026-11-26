# boredom-terminator

ReactGirls mentoring project 2026, a community-driven web app for discovering and sharing local cultural events.

## Live demo

https://boredom-terminator.vercel.app

## Development

```sh
npm ci
npm run dev
```

### Map configuration

Set `NEXT_PUBLIC_CARTO_API_KEY` in ignored `.env.local`; on Vercel, configure it for the relevant environment. Restart the dev server or redeploy after changing it.

Keep OpenStreetMap and CARTO attribution visible. Terms were last checked on 5 November 2026; tile requests count across the account, not per visitor or API key. Before commercial use or higher traffic, check [current CARTO terms and limits](https://carto.com/basemaps/apikey/), expected usage and any paid plan needed.

### Checks

In a clean worktree or after removing generated Next.js files, generate types before typechecking:

```sh
npx next typegen
npm run typecheck
```

`next-env.d.ts` and `.next/` are ignored by Git. `tsc --noEmit` does not generate them, which can cause errors such as `Cannot find name 'LayoutProps'`. If needed, invoke the local CLI with `node node_modules/next/dist/bin/next typegen`. Do not edit or commit generated files or replace them with manual type declarations. See [Next.js typegen](https://nextjs.org/docs/app/api-reference/cli/next#next-typegen-options).

Other checks: `npm test`, `npm run lint`, `npm run format:check` and `npm run build`. Current results and known blockers are in the status document.

## Documentation

- [MVP specification](documentation/mvp.md)
- [Roadmap and phase plans](documentation/roadmap.md)
- [Current status and next steps](documentation/status.md)
- [Pull request template](documentation/pr-template.md)
