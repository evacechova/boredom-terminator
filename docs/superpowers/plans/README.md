# Boredom Terminator – mentoringová implementační roadmapa

> Režim: learner-led mentoring. Studentka píše kód. Asistent vysvětluje, zadává malé kroky, kontroluje a nápovědu stupňuje podle potřeby.

**Specifikace:** `docs/superpowers/specs/2026-10-24-mvp-design.md`

**Proces:** `AGENTS.md`

**Aktuální handoff:** `docs/mentoring/status.md`

## Proč je plán rozdělený

Každý soubor představuje jeden smysluplný, samostatně kontrolovatelný celek. Má vlastní větev, nový kontext, cílené testy a závěrečný commit. Další fáze smí začít až po ověření předchozí.

## Pořadí fází

| Fáze | Větev                         | Výsledek                                       | Plán                                                                   |
| ---- | ----------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| 1    | `01-nextjs-foundation`        | Next.js základ, testy, téma a první nasazení   | [01-foundation.md](01-foundation.md)                                   |
| 2    | `02-event-domain`             | Typy, časová pravidla a filtry                 | [02-event-domain.md](02-event-domain.md)                               |
| 3    | `03-local-repository`         | Seed data a bezpečný `localStorage` repository | [03-local-repository.md](03-local-repository.md)                       |
| 4    | `04-discovery-ui`             | Stav hlavní obrazovky, filtry a textový seznam | [04-discovery-ui.md](04-discovery-ui.md)                               |
| 5    | `05-map-panel-gps`            | Leaflet mapa, markery, panel a GPS             | [05-map-panel-gps.md](05-map-panel-gps.md)                             |
| 6    | `06-event-form`               | Formulář a klientská validace                  | [06-event-form.md](06-event-form.md)                                   |
| 7    | `07-location-persistence`     | Výběr polohy, uložení a návrat na mapu         | [07-location-persistence.md](07-location-persistence.md)               |
| 8    | `08-resilience-accessibility` | Chybové stavy a přístupnost                    | [08-resilience-accessibility.md](08-resilience-accessibility.md)       |
| 9    | `09-e2e-deployment`           | E2E ověření a finální produkční nasazení       | [09-e2e-deployment.md](09-e2e-deployment.md)                           |
| 10   | `10-post-mvp-planning`        | Komplexní review a plány dalšího vývoje        | [10-post-mvp-review-and-roadmap.md](10-post-mvp-review-and-roadmap.md) |

Fáze 9 dokončí MVP. Fáze 10 nepřidává produktové funkce; zkontroluje výsledný kód a připraví další samostatné specifikace, plány a větve.

## Zahájení nového kontextu

Do nového kontextu stačí napsat například:

```text
Začínáme Fázi 2 na větvi 02-event-domain. Pracuj jako mentor podle AGENTS.md. Přečti status, specifikaci, roadmapu, plán Fáze 2, odchylky a relevantní memory. Nevytvářej za mě kód.
```

## Společná podmínka dokončení fáze

- Studentka rozumí cíli a umí vysvětlit hlavní rozhodnutí vlastními slovy; nejde o zkoušení, pouze kontrolu společného porozumění.
- Změna odpovídá specifikaci a rozsahu fáze.
- Cílené testy projdou.
- Lint a build projdou, pokud je fáze může ovlivnit.
- Mentor zkontroluje diff a nezůstanou nevysvětlené chyby.
- Vznikne jeden nebo více smysluplných commitů; poslední commit uzavírá fázi.
- `docs/mentoring/status.md` obsahuje nový handoff.
- Odchylky a trvalé poznatky jsou zapsané pouze tehdy, když vznikly.
