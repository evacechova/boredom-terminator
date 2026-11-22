# Fáze 3 – Seed demo a lokální repository

> Aktuální rozsah dema k 22. 11. 2026.

**Větev:** `03-local-repository`

**Cíl:** Tři relativní ukázkové události a načtení/reset lokálních testovacích dat.

**Závislosti:** Základ z 2A.2; před dokončením PR začlenit výsledek 2B z `main` a ověřit integraci.

## Architektura

- `createSeedEvents(now: Date): MapEvent[]` vytváří stabilní ID, texty a souřadnice s časy relativními k předanému okamžiku. Časy se ukládají jako UTC ISO řetězce.
- `createLocalEventRepository(storage: Storage, now: Date)` dostává úložiště a čas zvenku; modul při importu nečte browser API.
- `list(): MapEvent[]` spojí seedy s celým validním lokálním polem. Zod ověřuje strukturu a základní invarianty `MapEvent`. Nečitelný obsah, chyba přístupu nebo kolize ID znamenají návrat k samotným seedům.
- `resetSaved()` odstraní pouze `boredom-terminator:saved-events:v1`. Seedy zůstávají v kódu.
- Přidávání událostí se doplní společně s formulářem. Napojení repository do mapy patří do Fáze 4.

## Ukázkové události

| ID     | Událost                                     | Začátek vůči now | Konec vůči now |
| ------ | ------------------------------------------- | ---------------- | -------------- |
| mock-1 | Random play dance na Vyšehradě              | −1 hodina        | +1 hodina      |
| mock-2 | Cute Cats cover shoot na Václavském náměstí | +7 hodin         | +10 hodin      |
| mock-3 | Photocard event v Punchy Cup                | +72 hodin        | +240 hodin     |

## Proč toto řešení

Vlastní události jsou zahoditelná data pro manuální testování. Záchrana jednotlivých poškozených položek a archivace historie přidávaly složitost bez přínosu pro demo; stačí reset. Přesná pražská hodina seedů vyžadovala kalendářní převody, přestože pro ukázku filtrů stačí probíhající, blízká a pozdější událost. Zápisová operace zatím nemá volajícího, proto vznikne až s formulářem.

## Ověření

Automatické testy chrání načtení, fallback při poškození či nedostupnosti storage, kolize ID a reset vyhrazeného klíče. Tři časové scénáře seedů se ověří ručně při napojení do mapy. Před dokončením fáze musí projít společné testy po integraci 2B, lint, typecheck a build.
