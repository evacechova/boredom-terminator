# Fáze 1A – Next.js základ a testovací infrastruktura

> Režim: studentka implementuje, mentor vysvětluje a kontroluje. Bez výslovné žádosti mentor nepíše produkční kód.

**Větev:** `01-nextjs-foundation`

**Závisí na:** kontrolním commitu dokumentace na `main`

**Výsledek:** Spustitelná Next.js aplikace s TypeScriptem, nástroji pro kvalitu kódu a připraveným Jest a React Testing Library prostředím.

**Specifikace:** části 1–5 a základ akceptačních podmínek.

## Na co se soustředíme

- Co vytváří `create-next-app` a proč jednotlivé soubory existují.
- Rozdíl mezi App Routerem, layoutem a page route.
- Základní hranice Server a Client Components; v této fázi klientské API ještě nepotřebujeme.
- Jak fungují `package.json`, `package-lock.json` a npm skripty.
- Co ověřují lint, formátování, typecheck, build a konfigurace test runneru.
- Proč build nenahrazuje component test.

## Mentoringové kroky

1. Zkontrolovat Node.js, npm, Git a čistý výchozí stav.
2. Založit větev a projít bezpečný způsob scaffoldingu do existujícího neprázdného repozitáře.
3. Nechat studentku spustit scaffold a společně projít vzniklé soubory.
4. Spustit výchozí aplikaci a vysvětlit request od prohlížeče po `page.tsx`.
5. Nastavit ESLint pravidla, Prettier a npm skripty pro kontrolu kvality.
6. Přidat Jest, React Testing Library, `jsdom` a společný test setup.
7. Zkontrolovat instalační skripty nepřímých závislostí a zapsat bezpečnostní rozhodnutí.
8. Spustit konfiguraci Jestu, lint, format check, typecheck a produkční build.
9. Zkontrolovat diff, aktualizovat handoff a připravit samostatný pull request.

## Testy a ověření

- `npm test -- --showConfig` načte `next/jest`, `jsdom` a `jest.setup.ts`.
- `npm install-scripts ls` nehlásí nezkontrolované instalační skripty.
- `npm run lint` projde.
- `npm run format:check` projde.
- `npm run typecheck` projde.
- `npm run build` projde.

## Fáze neobsahuje

- Component test stránky ani úpravu výchozího UI.
- daisyUI, vlastní téma nebo finální logo.
- Veřejné nasazení.
- Leaflet, GPS, `localStorage`, React Hook Form, Zod ani doménovou logiku.

## Checkpoint commity

- `01cfc09 chore: scaffold Next.js application`
- `c2a8326 chore: configure code quality tooling`
- `bbd8809 test: configure Jest and Testing Library`

Commit provede mentor pouze na výslovnou žádost.

## Handoff

Po merge založit větev `01-foundation-ui` podle `01b-foundation-ui.md`. Prvním krokem je obnovit rozpracovaný component test, dokončit jeho RED stav a teprve potom upravit stránku.
