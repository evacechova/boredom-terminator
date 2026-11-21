# Generované typy Next.js v novém worktree

## Kontext

V samostatném worktree Fáze 3 selhával `npm run typecheck` na `Cannot find name 'LayoutProps'` v `src/app/layout.tsx`. Chyběly ignorované `next-env.d.ts` i `.next`.

## Ověřený poznatek

`LayoutProps` je globální typ generovaný Next.js, nepotřebuje ruční import. Projektový skript `typecheck` spouští pouze `tsc --noEmit`, které typy Next.js nevygeneruje. `tsconfig.json` už správně zahrnuje příslušné generované soubory.

Ověřeno 22. 11. 2026: `node node_modules/next/dist/bin/next typegen` vytvořilo `next-env.d.ts` a `.next/types/routes.d.ts` s deklarací `LayoutProps`. Následné `npm run typecheck` prošlo bez změny zdrojového kódu.

## Dopad na další práci

Před samostatným typecheckem v čistém worktree nechat Next.js vygenerovat typy. Stačí `next typegen`; generování probíhá také při `next dev` a `next build`. Generované soubory necommitovat ani nenahrazovat jejich chybějící obsah ručně psanou deklarací `LayoutProps`.

Zdroj: [Next.js CLI – typegen](https://nextjs.org/docs/app/api-reference/cli/next#next-typegen-options).
