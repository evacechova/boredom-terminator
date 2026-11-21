# Boredom Terminator – mentoringová implementační roadmapa

> Režim: learner-led mentoring. Studentka píše kód. Asistent vysvětluje, zadává malé kroky, kontroluje a nápovědu stupňuje podle potřeby.

**Specifikace:** `docs/superpowers/specs/2026-10-24-mvp-design.md`

**Proces:** `AGENTS.md`

**Aktuální handoff:** `docs/mentoring/status.md`

## Proč je plán rozdělený

Každý soubor představuje jeden smysluplný, samostatně kontrolovatelný celek. Má vlastní větev, nový kontext, cílené testy a závěrečný commit. Další fáze smí začít až po ověření předchozí, s výslovnou výjimkou souběhu Fází 2B a 3 níže.

## Princip postupného rozšiřování

Nejdřív vznikne zjednodušené funkční demo s pevnými mock daty: mapa, výběr pinu, základní karta a mobilní i desktopové zobrazení. Teprve potom přidáváme časová pravidla, filtry, úložiště a vytváření událostí. Každá další fáze rozšiřuje stejné UI; mapu ani kartu nestaví znovu. Finální MVP specifikace zůstává cílem, nikoli vstupní podmínkou dema.

## Pořadí fází

| Fáze | Větev                         | Výsledek                                       | Plán                                                                   |
| ---- | ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| 1A   | `01-nextjs-foundation`        | Next.js základ, tooling a test infrastruktura  | [01-foundation.md](01-foundation.md)                                   |
| 1B   | `01-foundation-ui`            | Základní UI, téma a první nasazení             | [01b-foundation-ui.md](01b-foundation-ui.md)                           |
| 2A   | `02-event-map`                | Zjednodušené demo: mapa, karta, mobilní UI     | [02-event-domain.md](02-event-domain.md)                               |
| 2A.2 | `02a2-event-map-ui`           | Dokončení karty a mapového UI                  | [02a2-event-map-ui.md](02a2-event-map-ui.md)                           |
| 2B   | `02b-event-domain`            | Časová pravidla a filtry nad hotovým modelem   | [02b-event-domain.md](02b-event-domain.md)                             |
| 3    | `03-local-repository`         | Seed data a bezpečný `localStorage` repository | [03-local-repository.md](03-local-repository.md)                       |
| 4    | `04-discovery-ui`             | Stav hlavní obrazovky, filtry a textový seznam | [04-discovery-ui.md](04-discovery-ui.md)                               |
| 5    | `05-map-panel-gps`            | Úplný obsah karty, externí odkazy a GPS        | [05-map-panel-gps.md](05-map-panel-gps.md)                             |
| 6    | `06-event-form`               | Formulář a klientská validace                  | [06-event-form.md](06-event-form.md)                                   |
| 7    | `07-location-persistence`     | Výběr polohy, uložení a návrat na mapu         | [07-location-persistence.md](07-location-persistence.md)               |
| 8    | `08-resilience-accessibility` | Chybové stavy a přístupnost                    | [08-resilience-accessibility.md](08-resilience-accessibility.md)       |
| 9    | `09-e2e-deployment`           | E2E ověření a finální produkční nasazení       | [09-e2e-deployment.md](09-e2e-deployment.md)                           |
| 10   | `10-post-mvp-planning`        | Komplexní review a plány dalšího vývoje        | [10-post-mvp-review-and-roadmap.md](10-post-mvp-review-and-roadmap.md) |

Fáze 9 dokončí MVP. Fáze 10 nepřidává produktové funkce; zkontroluje výsledný kód a připraví další samostatné specifikace, plány a větve.

## Schválený souběh Fází 2B a 3

- Po schválení a commitu společné dokumentace vycházejí obě větve ze stejného commitu. Každá má vlastní worktree a chat. Nová Fáze 3A nevzniká a funkce se mezi fázemi nepřesouvají.
- Základ z 2A.2 už obsahuje rozšířený `MapEvent`, osm kategorií, `city: "Praha"`, pražský formatter a `getDefaultEventEnd`. Společný model ani jeho název se během souběhu bez dohody nemění. Městské části zůstávají odložené.
- 2B vlastní převody pražského času, DST, časové filtry, řazení a Google Maps URL. Fáze 3 vlastní relativní seed data, Zod validaci uložených záznamů a repository se storage. Není závislá na nehotových funkcích 2B; případné napojení počká na integraci.
- Společný kontrakt: UTC ISO časy, volitelné `endsAt`, jeho výpočet existujícím helperem a předaný `now` místo skrytého aktuálního času.
- Nejprve se sloučí PR 2B. Potom se aktuální `main` začlení do větve 3; při kolizi manifestů a lockfile se zachovají obě potřebné závislosti a ověří instalace. Každá fáze má vlastní ověření a PR. Fáze 4 čeká na dokončení obou.
- Postup obou proudů se eviduje odděleně v `docs/mentoring/status.md`. Každý chat pracuje pouze ve svém worktree; souběžné servery mají rozdílné porty. Společné soubory se nepřenášejí ručním kopírováním.

## Zahájení nového kontextu

Do nového kontextu stačí napsat například:

```text
Začínáme Fázi 2A na větvi 02-event-map. Pracuj jako mentor podle AGENTS.md. Přečti status, specifikaci, roadmapu, plán Fáze 2A, odchylky a relevantní memory. Nevytvářej za mě kód.
```

## Společná podmínka dokončení fáze

- Studentka rozumí cíli a umí vysvětlit hlavní rozhodnutí vlastními slovy; nejde o zkoušení, pouze kontrolu společného porozumění.
- Změna odpovídá specifikaci a rozsahu fáze.
- Cílené testy projdou.
- Lint a build projdou, pokud je fáze může ovlivnit.
- Mentor zkontroluje diff a nezůstanou nevysvětlené chyby.
- Vznikne jeden nebo více smysluplných commitů; poslední commit uzavírá fázi.
- Pull request se sloučí strategií **Squash and merge**, aby na `main` vznikl jeden výsledný commit za fázi.
- `docs/mentoring/status.md` obsahuje nový handoff.
- Odchylky a trvalé poznatky jsou zapsané pouze tehdy, když vznikly.
