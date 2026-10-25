# Boredom Terminator – stav a handoff

> Aktualizováno 25. 10. 2026. Tento soubor je výchozí bod každého nového kontextu.

## Aktuální stav

- Finální MVP specifikace byla schválena: `docs/superpowers/specs/2026-10-24-mvp-design.md`.
- Implementace je rozdělena do samostatných branch plánů: `docs/superpowers/plans/README.md`.
- Po dokončení MVP naváže Fáze 10: komplexní review kódu a tvorba aktivní post-MVP roadmapy, specifikací a dalších implementačních plánů.
- Spolupráce probíhá v learner-led mentoring režimu podle `AGENTS.md`.
- Aktivní fáze: Fáze 1 – Next.js základ a první nasazení.
- Aktivní větev: `01-nextjs-foundation`.
- Next.js scaffold používá TypeScript, App Router v `src/app`, Tailwind CSS, ESLint a Turbopack.
- Nainstalované hlavní verze: Node.js `26.12.0`, npm `11.20.0`, Next.js `16.4.3`, React `19.3.0`, TypeScript `5.9.3` a Prettier `3.9.10`.
- Výchozí stránka byla ověřena přes dev server požadavkem `GET / 200`.
- ESLint používá Next.js flat config, vlastní pravidla kvality kódu a `eslint-config-prettier`.
- Prettier, npm skripty a stručná clean-code pravidla v `AGENTS.md` jsou nastavené.
- `npm run lint`, `npm run format:check` a `npm run typecheck` procházejí bez problémů.
- `npm run build` prochází včetně TypeScript kontroly a statického renderu route `/`.
- Testovací prostředí, daisyUI, vlastní stránka a veřejné nasazení zatím nejsou hotové.
- Známá instalační varování: ESLint `9.39.5` je EOL a `unrs-resolver@1.12.2` má neschválený `postinstall` skript.

## Nejbližší krok

1. Přidat Jest a React Testing Library podle kroku 5 plánu Fáze 1.
2. Vysvětlit rozdíl mezi produkčním buildem a component testem.
3. Vyřešit nebo vědomě přijmout zbývající instalační varování.

## Tooling checkpoint

- Flat config zachovává `eslint-config-next/core-web-vitals` a `eslint-config-next/typescript`.
- Vlastní pravidla vynucují jednoduchý control flow, striktní porovnávání, blokové závorky, `const` a omezení `console` a `any`.
- `max-depth`, `complexity`, `no-console` a `@typescript-eslint/no-explicit-any` jsou varování; ostatní vlastní pravidla jsou chyby.
- Prettier používá středníky, dvojité uvozovky, dvě mezery, trailing commas `all` a šířku `100`.
- `eslint-config-prettier` je načtený před vlastními pravidly, aby explicitní `curly: ["error", "all"]` zůstalo aktivní.
- Skripty `lint`, `lint:fix`, `format`, `format:check` a `typecheck` jsou připravené.
- Po schválení byly Prettierem upraveny pouze čtyři dříve neformátované soubory.
- Ověření `npm run lint`, `npm run format:check` a `npm run typecheck` prošlo 25. 10. 2026.
- Tooling checkpoint je commit `c2a8326 chore: configure code quality tooling`.

## Scaffold checkpoint

- Výchozí dokumentační checkpoint je commit `a588d6c docs: simplify phase branch names`.
- Scaffold checkpoint je commit `01cfc09 chore: scaffold Next.js application`.
- Po scaffold checkpointu následoval tooling checkpoint `c2a8326`.

## Následující fáze

Fáze 1 obsahuje Next.js scaffold, základní testovací prostředí a první veřejné nasazení. Přesné kroky a podmínky dokončení jsou v `docs/superpowers/plans/01-foundation.md`.

## Handoff šablona po dokončení fáze

Po každé fázi nahradit aktuální stav těmito údaji:

- dokončená fáze a větev,
- výsledný commit,
- co je funkční,
- jaké testy, lint a build proběhly,
- známé problémy,
- nové odchylky a jejich odkazy,
- relevantní memory soubory,
- přesný první krok další fáze.
