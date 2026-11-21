# Generované typy Next.js v novém worktree

`next-env.d.ts` a `.next/` jsou ignorované Gitem. Nový worktree je proto nemusí obsahovat ani po `npm ci`. Samotné `tsc --noEmit` je nevytváří; globální typy jako `LayoutProps` poskytuje Next.js.

Před samostatným typecheckem v novém worktree nebo po vyčištění generovaných souborů spustit:

```sh
npx next typegen
npm run typecheck
```

`next typegen` vytváří typy rout a `next-env.d.ts` bez plného buildu. Generované soubory neupravovat ručně ani necommitovat. Skript `typecheck` nyní spouští pouze `tsc --noEmit`.

Zdroj: [Next.js CLI – next typegen](https://nextjs.org/docs/app/api-reference/cli/next#next-typegen-options).
