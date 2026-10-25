# Fáze 2 – Event doména, pražský čas a filtry

> Režim: studentka implementuje, mentor vysvětluje TypeScript a TDD po malých krocích.

**Větev:** `02-event-domain`

**Závisí na:** dokončené Fázi 1

**Výsledek:** Čisté TypeScript typy a funkce pro události, čas, filtrování, řazení a Google Maps URL.

**Specifikace:** části 6, 7 a 17.

## Na co se soustředíme

- Rozdíl mezi TypeScript typem a runtime validací.
- Union typy pro kategorie a městské části.
- Čisté funkce bez Reactu a browser API.
- TDD cyklus red–green–refactor.
- Rozdíl mezi pražským lokálním časem a UTC ISO.
- Injektovaný `now` místo skrytého `new Date()` uvnitř testované logiky.

## Veřejná rozhraní fáze

Doména poskytne typy `Event`, `EventCategory`, `PragueDistrict` a `EventLocation` a funkce pro:

- převod pražského data a času na UTC ISO,
- formátování uloženého času pro Prahu,
- výpočet dvouhodinového výchozího konce,
- rolling 24hodinový filtr,
- filtr podle pražského data začátku,
- volitelný filtr městské části,
- vzestupné řazení podle začátku,
- bezpečný Google Maps odkaz z přesných souřadnic.

## Mentoringové kroky

1. Navrhnout datové typy z příkladů ve specifikaci.
2. Napsat první failing test pro letní a zimní převod pražského času.
3. Vybrat a pochopit knihovnu pro IANA časové pásmo; přidat ji až teď.
4. Implementovat minimální časové funkce a ověřit DST případy.
5. Napsat test dvouhodinového výchozího konce.
6. Napsat test rolling filtru: probíhající a začínající během 24 hodin.
7. Napsat test konkrétního data: rozhoduje pouze `startsAt`; událost z předchozího dne se nezobrazí.
8. Přidat městskou část a řazení.
9. Otestovat validní a neplatné souřadnice a přesný Google Maps odkaz.
10. Zkontrolovat názvy, duplicity a čitelnost typů.

## Testy a ověření

- Letní a zimní pražský čas vytvoří správné UTC hodnoty.
- Test pokryje přechod letního času.
- Rolling filtr zahrne aktivní a blízké události, ne pozdější.
- Datum 30. října zahrne jen události začínající 30. října.
- District filtr a řazení fungují společně.
- Google Maps URL používá zakódované souřadnice.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Zod schema uložených dat.
- React komponenty.
- `localStorage`.

## Doporučený závěrečný commit

`feat: add event domain rules`

## Handoff

Do `status.md` zapsat veřejné doménové typy/funkce, použitou časovou knihovnu, ověřené DST případy a první krok Fáze 3. Nové TypeScript poznatky s dopadem na další fáze uložit do `memory/02-*.md`.
