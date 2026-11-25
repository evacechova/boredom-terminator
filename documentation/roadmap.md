# Roadmapa Boredom Terminator

Produkt určuje [MVP](mvp.md), spolupráci [AGENTS.md](../AGENTS.md) a aktuální práci [status](status.md). Rozpracovaná fáze má vlastní plán, větev, ověření, commit a schválený PR. Dokončené fáze shrnuje tento soubor.

## Dokončené fáze

| Fáze | Větev                  | Výsledek                                          | PR / commit    |
| ---- | ---------------------- | ------------------------------------------------- | -------------- |
| 1A   | `01-nextjs-foundation` | Next.js, TypeScript, Jest a nástroje              | #1 / `0d42cfb` |
| 1B   | `01-foundation-ui`     | Světlé téma, logo a první nasazení                | #2 / `f560b61` |
| 2A   | `02-event-map`         | Mapa, výběr, zavírání a fokus                     | #3 / `e812cea` |
| 2A.2 | `02a2-event-map-ui`    | Detail, model, mapová konfigurace a výchozí konec | #4 / `274a38e` |
| 2B   | `02b-event-domain`     | Pražský čas, filtry, řazení a navigace            | #6 / `2bf918b` |
| 3    | `03-local-repository`  | Relativní seedy; název větve je historický        | #5 / `a54c795` |

2B i 3 jsou sloučené do `main`; jejich souběh je uzavřený. Filtry ještě nejsou napojené do UI a Fáze 3 neobsahuje repository ani schema úložiště.

## Rozhodnutí důležitá pro další práci

- Dynamický import Leafletu bez SSR zajišťuje přímo `EventMapContainer`; další předávací obal neměl přínos. Výběr má jediný zdroj `selectedEventId`, objekt události se odvozuje.
- Vzhled markeru je v `src/styles`, Leaflet adaptér u mapy a sdílené React prvky v `src/components/ui`, aby vzhled nezávisel na mapové knihovně.
- `localDateTimeToUtc` používá `@js-temporal/polyfill` a porovnává obě interpretace času kvůli DST. Rozlišuje chybu vstupu, pásma, neexistující a dvojznačný čas.
- `filterEventsByDate` vrací `undefined` pro neplatné datum a `[]` pro platný den bez výsledků. Výchozí délku rolling okna určuje `src/config/app-config.ts`; přesná časová pravidla jsou v MVP.
- Doménové testy chrání DST, časové hranice a chybové vstupy. Řazení včetně neměnnosti vstupu bylo ověřeno krátkým spustitelným příkladem; stejné výpočty se netestují znovu na UI vrstvě. Statické testy hlavičky nejsou povinným trvalým pokrytím.
- `createSeedEvents(now)` vrací probíhající, blízkou a pozdější ukázku. Serverová stránka má `dynamic = "force-dynamic"`, aby časy nezůstaly podle okamžiku buildu. Ve Fázi 4 začne factory volat GET; ukázky se do databáze nepřenášejí.
- Repository a schema úložiště ve Fázi 3 neměly skutečného volajícího, proto nevznikly. Čtení databáze zavede Fáze 4 a zápis Fáze 7.

Aktuální výsledky kontrol a neověřené body patří do statusu. Spuštění, generované typy Next.js a podmínky CARTO jsou v [README](../README.md).

## Nové MVP: REST a PostgreSQL

| Fáze     | Větev                         | Výsledek                                                        | Plán                                |
| -------- | ----------------------------- | --------------------------------------------------------------- | ----------------------------------- |
| 4        | `04-database-api`             | Neon, migrace, GET s uloženými událostmi a dynamickými ukázkami | [4](04-database-api.md)             |
| 5        | `05-map-panel-gps`            | Filtry, URL, úplný detail, GPS a textový seznam                 | [5](05-map-panel-gps.md)            |
| 6        | `06-event-form`               | Formulář a validace                                             | [6](06-event-form.md)               |
| 7        | `07-location-persistence`     | Výběr polohy, vlastní POST a návrat na mapu                     | [7](07-location-persistence.md)     |
| 8        | `08-resilience-accessibility` | API/mapové chyby a přístupnost                                  | [8](08-resilience-accessibility.md) |
| 9        | `09-e2e-deployment`           | E2E a veřejné ověření MVP                                       | [9](09-e2e-deployment.md)           |
| Bonus 10 | `10-post-mvp-planning`        | Review a výběr dalšího vývoje                                   | [10](10-bonus.md)                   |

Fáze 4–9 postupují sekvenčně. Fáze 9 uzavírá MVP; bonus je volitelný a jeho kandidáti nejsou schválenými funkcemi. Znovu se používají hotová mapa, doména a UI; závislosti se přidávají až při použití.

Před Fází 4 dokončit rozpracovaný úklid a prověřit závislosti podle statusu.
