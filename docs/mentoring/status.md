# Boredom Terminator – stav a handoff

> Aktualizováno 29. 10. 2026. Tento soubor je výchozí bod každého nového kontextu.

## Aktuální stav

- Finální MVP specifikace byla schválena: `docs/superpowers/specs/2026-10-24-mvp-design.md`.
- Implementace je rozdělena do samostatných branch plánů: `docs/superpowers/plans/README.md`.
- Po dokončení MVP naváže Fáze 10: komplexní review kódu a tvorba aktivní post-MVP roadmapy, specifikací a dalších implementačních plánů.
- Spolupráce probíhá v learner-led mentoring režimu podle `AGENTS.md`.
- Aktivní fáze: Fáze 1B – základní UI a první nasazení.
- Aktivní větev: `01-foundation-ui`.
- Fáze 1 byla rozdělena na samostatné PR: setup ve Fázi 1A a UI s prvním deploymentem ve Fázi 1B.
- Fáze 1A byla sloučena do `main` přes PR #1 jako commit `0d42cfb chore: set up Next.js foundation and test tooling (#1)`.
- Next.js scaffold používá TypeScript, App Router v `src/app`, Tailwind CSS, ESLint a Turbopack.
- Nainstalované hlavní verze: Node.js `26.12.0`, npm `11.20.0`, Next.js `16.4.3`, React `19.3.0`, TypeScript `5.9.3` a Prettier `3.9.10`.
- Výchozí stránka byla ověřena přes dev server požadavkem `GET / 200`.
- ESLint používá Next.js flat config, vlastní pravidla kvality kódu a `eslint-config-prettier`.
- Prettier, npm skripty a stručná clean-code pravidla v `AGENTS.md` jsou nastavené.
- `npm run lint`, `npm run format:check` a `npm run typecheck` procházejí bez problémů.
- `npm run build` prochází včetně TypeScript kontroly a statického renderu route `/`.
- Jest a React Testing Library jsou nainstalované a nakonfigurované. Fáze 1A je dokončená.
- Základní stránka a její component test jsou uložené v checkpointu `5a3bf84 feat: add foundation landing page`; testy pro heading, logo a odkaz `Add event` procházejí.
- Původní stash s component testem byl po checkpointu odstraněn.
- daisyUI `5.7.50` je nainstalované jako dev dependency. Vlastní světlé téma `boredom-terminator` je nakonfigurované, landing page používá theme tokeny a odkaz `Add event` používá `btn btn-primary`.
- Závěrečné ověření 29. 10. 2026 prošlo: `npm test` (`3/3`), `npm run lint`, `npm run format:check`, `npm run typecheck`, `npx next build --webpack` v Codex runneru a lokální `npm run build` s Turbopackem. Vizuální kontrola landing page proběhla 28. 10. 2026.
- Landing page používá dočasné `public/boredom-terminator-logo-full.png` o velikosti přibližně 1,5 MB. Další optimalizace loga je známý problém odložený na později a neblokuje první deployment.
- Nepoužitý `public/boredom-terminator-logo.png` se záměrně ponechává jako alternativní podklad pro pozdější práci s logem.
- Vercel je připojený. Veřejný deployment aktuální větve a výsledná URL zatím nejsou ověřené.
- Známá instalační varování: ESLint `9.39.5` je EOL a nepřímé závislosti `whatwg-encoding@3.1.1` a `glob@10.5.0` jsou označené jako zastaralé. `npm audit` hlásí `0 vulnerabilities`.
- Instalační skripty `unrs-resolver@1.12.2` a `@parcel/watcher@2.6.0` jsou po kontrole výslovně zakázané přes `allowScripts`; oba nativní moduly se bez nich načtou.
- `npm run build` v Codex runneru blokuje omezení lokálního portu uvnitř Turbopack CSS child procesu. Projektový Turbopack build však prošel v lokálním terminálu; Codex runner používá pro ověření Webpack fallback.

## Nejbližší krok

1. Commitnout a pushnout ověřené změny na větev `01-foundation-ui`.
2. Ověřit Vercel deployment aktuální větve včetně Turbopack buildu, uložit veřejnou URL do README a uzavřít Fázi 1B podle `01b-foundation-ui.md`.

## Tooling checkpoint

- Flat config zachovává `eslint-config-next/core-web-vitals` a `eslint-config-next/typescript`.
- Vlastní pravidla vynucují jednoduchý control flow, striktní porovnávání, blokové závorky, `const` a omezení `console` a `any`.
- `max-depth`, `complexity`, `no-console` a `@typescript-eslint/no-explicit-any` jsou varování; ostatní vlastní pravidla jsou chyby.
- Prettier používá středníky, dvojité uvozovky, dvě mezery, trailing commas `all` a šířku `100`.
- `eslint-config-prettier` je načtený před vlastními pravidly, aby explicitní `curly: ["error", "all"]` zůstalo aktivní.
- Skripty `lint`, `lint:fix`, `format`, `format:check` a `typecheck` jsou připravené.
- Jest, React Testing Library, DOM Testing Library, jest-dom, jsdom prostředí, `ts-node` a typy Jestu jsou nainstalované.
- `jest.config.ts` používá `next/jest`, prostředí `jsdom` a společný setup `jest.setup.ts`; skripty `test` a `test:watch` jsou připravené.
- `allowScripts` výslovně zakazuje instalační skripty `unrs-resolver` a `@parcel/watcher`; `npm install-scripts ls` nehlásí žádné nezkontrolované skripty.
- Po schválení byly Prettierem upraveny pouze čtyři dříve neformátované soubory.
- Ověření `npm run lint`, `npm run format:check` a `npm run typecheck` prošlo 25. 10. 2026.
- Tooling checkpoint je commit `c2a8326 chore: configure code quality tooling`.

## Scaffold checkpoint

- Výchozí dokumentační checkpoint je commit `a588d6c docs: simplify phase branch names`.
- Scaffold checkpoint je commit `01cfc09 chore: scaffold Next.js application`.
- Po scaffold checkpointu následoval tooling checkpoint `c2a8326`.

## Následující fáze

Fáze 1B obsahuje component test, základní stránku, daisyUI téma a první veřejné nasazení. Přesné kroky a podmínky dokončení jsou v `docs/superpowers/plans/01b-foundation-ui.md`.

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
