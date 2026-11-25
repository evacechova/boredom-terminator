# Fáze 3 – Relativní seed data pro mapové demo

**Větev:** `03-local-repository`

**Cíl:** Tři ukázkové události, které při načtení dema odpovídají aktuálnímu času.

## Architektura

`createSeedEvents(now: Date): MapEvent[]` vrací tři události se stabilními ID, texty a souřadnicemi. Všechny časy jsou UTC ISO řetězce odvozené od předaného okamžiku.

Serverová `page.tsx` vytvoří seedy a předá je existujícímu `EventMapContainer`. Route má `dynamic = "force-dynamic"`, aby se události vytvářely při požadavku a nezůstaly napevno podle času produkčního buildu. Mapa i panel používají stávající implementaci.

| ID     | Událost                                     | Začátek vůči now | Konec vůči now |
| ------ | ------------------------------------------- | ---------------- | -------------- |
| mock-1 | Random play dance na Vyšehradě              | −1 hodina        | +1 hodina      |
| mock-2 | Cute Cats cover shoot na Václavském náměstí | +7 hodin         | +10 hodin      |
| mock-3 | Photocard event v Punchy Cup                | +72 hodin        | +240 hodin     |

## Proč toto řešení

Demo zatím používá pouze data definovaná v kódu. Repository, storage validace a reset neměly skutečného volajícího v aplikaci; datová vrstva vznikne až s ukládáním vlastních událostí. Pro seedy stačí typ `MapEvent`. Prosté časové posuny zajišťují tři ukázkové scénáře bez kalendářních převodů.

## Ověření a návaznost

Ověřit mapu a panel se třemi událostmi, existující testy, lint, typecheck a build. Samostatné testy konstantních posunů seedů nejsou potřeba. Před dokončením PR začlenit výsledek 2B z `main` a ověřit integraci; filtry a formulář patří do navazujících fází.

[Next.js – dynamické vykreslování route](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic)
