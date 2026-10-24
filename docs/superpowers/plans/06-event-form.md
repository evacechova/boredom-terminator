# Fáze 6 – Formulář a okamžitá validace

> Režim: studentka implementuje. Mentor vysvětluje React Hook Form, Zod a TypeScript generika po malých částech.

**Větev:** `phase/06-event-form`

**Závisí na:** doméně z Fáze 2 a vizuálním základu z Fáze 1

**Výsledek:** Route `/events/new` obsahuje responzivní formulář se schválenými poli a okamžitou klientskou validací. Zatím neukládá událost.

**Specifikace:** části 10 a 12.

## Na co se soustředíme

- Rozdíl mezi hodnotou HTML inputu, formulářovým typem a doménovým `Event`.
- Co spravuje React Hook Form a co Zod.
- `zodResolver`, TypeScript inference a případné input/output typy.
- Validace po blur versus po submitu.
- Cross-field pravidla pro začátek a konec.
- Propojení labelu, pole a chybové zprávy.

## Pole a limity

- Povinné: název, podkategorie, datum, čas začátku a poloha.
- Volitelné: čas konce, městská část, místo, popis a zdrojový odkaz.
- Název: po trimu 1–100 znaků.
- Místo: po trimu nejvýše 120 znaků.
- Popis: nejvýše 500 znaků.
- Zdrojový odkaz: pouze HTTP(S), nejvýše 2048 znaků.

Poloha bude v této fázi dočasně reprezentovaná testovacím vstupem nebo injektovanou hodnotou. Skutečnou mapu připojí Fáze 7.

## Mentoringové kroky

1. Navrhnout `EventFormValues` podle skutečných inputů, ne podle uloženého `Event`.
2. Napsat failing test jednoho povinného pole po blur.
3. Přidat React Hook Form s režimem validace po opuštění pole.
4. Připojit Zod resolver a porozumět toku hodnot a chyb.
5. Přidávat pole po jedné sekci: základ, čas, poloha, volitelné údaje.
6. Testovat konec pozdější než začátek a výsledný konec v budoucnosti.
7. Testovat pražský čas kolem letního času.
8. Zajistit zachování hodnot a fokus první chyby po submitu.
9. Propojit chyby pomocí `aria-invalid` a `aria-describedby`.
10. Ověřit, že HTML-like popis zůstává textem.
11. Vyladit mobile-first rozložení; bez mapové integrace.

## Testy a ověření

- Chyba pole vznikne po blur, ne před interakcí.
- Submit zkontroluje celý formulář.
- Fokus skončí na prvním chybném poli.
- Hodnoty se při chybě neztratí.
- Limity, URL a časová pravidla mají cílené testy.
- 500znakový popis projde; 501 znaků neprojde.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Skutečný Leaflet location picker.
- Zápis do repository.
- Draft autosave.

## Doporučený závěrečný commit

`feat: add event creation form`

## Handoff

Do `status.md` zapsat formulářový typ, validační režim, limity, nevyřešenou polohu a první krok Fáze 7. Důležité React Hook Form/Zod/TypeScript poznatky uložit do `memory/06-*.md`.
