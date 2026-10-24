# Fáze 3 – Seed data a lokální repository

> Režim: studentka implementuje, mentor vysvětluje rozhraní, dependency injection a práci s nedůvěryhodnými daty.

**Větev:** `phase/03-local-repository`

**Závisí na:** doméně z Fáze 2

**Výsledek:** Testovatelný repository spojující relativní seed data s platnými uživatelskými událostmi z `localStorage`.

**Specifikace:** části 7, 14 a odpovídající část 17.

## Na co se soustředíme

- Repository jako hranice mezi UI a úložištěm.
- Proč `localStorage` data nejsou důvěryhodná.
- Rozdíl mezi TypeScript typem a Zod parsováním za běhu.
- Dependency injection přes předané `Storage` a `now`.
- Testování bez skutečného prohlížeče.

## Veřejná rozhraní fáze

- `createSeedEvents(now)` vrací stabilní ukázkové události s časy relativními k `now`.
- `EventRepository` nabízí načtení, přidání, odstranění neplatných záznamů a reset lokálních událostí.
- Výsledek načtení vrací události, počet neplatných položek a informaci o nečitelné struktuře.

## Mentoringové kroky

1. Navrhnout realistická seed data s pevnými ID, texty a pražskými souřadnicemi.
2. Vysvětlit, proč se časy seed dat odvozují od předaného `now`.
3. Napsat test aktivní, blízké a pozdější seed události.
4. Navrhnout malé `EventRepository` rozhraní bez Reactu.
5. Přidat Zod schema pro uložený `Event`.
6. Vytvořit jednoduchý in-memory `Storage` fake pro testy.
7. Testovat validní lokální položku vedle neplatné položky.
8. Testovat poškozený JSON, jiný kořen než pole a chybu `getItem`.
9. Implementovat načtení tak, aby seed data vždy přežila.
10. Testovat úspěšný a neúspěšný zápis.
11. Přidat explicitní recovery operace; načtení samo nic nemaže.

## Testy a ověření

- Stabilní seed data pokrývají všechny tři podkategorie.
- Platná lokální událost se spojí se seed daty.
- Neplatný soused se přeskočí a nahlásí.
- Poškozený JSON nebo chyba čtení nezhodí aplikaci.
- Selhání zápisu se propaguje volajícímu.
- `removeInvalid` a `resetSaved` mění pouze vyhrazený storage klíč.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- UI warningy a potvrzovací dialogy; přijdou ve Fázi 8.
- Formulář pro zápis události; přijde ve Fázích 6–7.

## Doporučený závěrečný commit

`feat: add local event repository`

## Handoff

Do `status.md` zapsat repository kontrakt, storage klíč, chování neplatných dat, testovací fake a první krok Fáze 4. Zod nebo `localStorage` zvláštnosti použitelné dál uložit do `memory/03-*.md`.
