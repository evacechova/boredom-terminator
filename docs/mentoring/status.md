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
- Nainstalované hlavní verze: Node.js `26.12.0`, npm `11.20.0`, Next.js `16.4.3`, React `19.3.0` a TypeScript `5.9.3`.
- Výchozí stránka byla ověřena přes dev server požadavkem `GET / 200`.
- `npm run lint` prochází bez problémů.
- `npm run build` prochází včetně TypeScript kontroly a statického renderu route `/`.
- Testovací prostředí, Prettier, daisyUI, vlastní stránka a veřejné nasazení zatím nejsou hotové.
- Známá instalační varování: ESLint `9.39.5` je EOL a `unrs-resolver@1.12.2` má neschválený `postinstall` skript.

## Nejbližší krok

1. Vytvořit scaffold checkpoint commitem `chore: scaffold Next.js application`.
2. Nastavit ESLint, Prettier, npm skripty a stručná clean-code pravidla podle připraveného zadání.
3. Ověřit lint, formátování a samostatný TypeScript typecheck.

## Scaffold checkpoint

- Výchozí dokumentační checkpoint je commit `a588d6c docs: simplify phase branch names`.
- Scaffold checkpoint má použít commit message `chore: scaffold Next.js application`.
- Hash scaffold commitu se doplní po jeho vytvoření.
- Po checkpointu pokračuje Fáze 1 konfigurací nástrojů pro kvalitu kódu.

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
