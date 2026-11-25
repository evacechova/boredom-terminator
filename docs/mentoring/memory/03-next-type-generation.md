# Generované typy Next.js v čistém worktree

`LayoutProps` vzniká v ignorovaných souborech Next.js. Samotné `tsc --noEmit` je nevytvoří, proto v čistém worktree hlásilo `Cannot find name 'LayoutProps'`.

Před typecheckem nechat Next.js vygenerovat typy. Ověřený příkaz:

```sh
node node_modules/next/dist/bin/next typegen
```

Potom spustit `npm run typecheck`. Generované soubory necommitovat ani nenahrazovat ruční deklarací typu.

[Next.js CLI – typegen](https://nextjs.org/docs/app/api-reference/cli/next#next-typegen-options)
