# Fáze 6 – Formulář a validace

**Větev:** `06-event-form`. **Závisí na:** discovery UI z Fáze 5 a časové doméně.

**Výsledek:** `/events/new` má formulář se všemi poli a klientskou validací. V této fázi ještě nevytváří databázový záznam.

**Specifikace:** [MVP](mvp.md), část Přidání události; tam jsou jedině uvedené limity a povinná pole.

## Soubory a odpovědnosti

- `src/app/events/new/page.tsx` a `src/components/event-form/`: route, formulář a chyby polí.
- `src/core/events/event-input-schema.ts`: Zod pravidla pro obsah nové události bez serverových metadat; použije je i POST ve Fázi 7.
- Hodnoty HTML formuláře mají vlastní typ: datum a čas nejsou totéž jako UTC ISO v `MapEvent`. Sdílet shodná pravidla, nevynucovat jeden typ pro různé vstupy.

## Kroky

1. Navrhnout formulářové hodnoty a jejich převod na vstup API. Znovu použít převod pražského času; jeho chyby propojit s poli.
2. Přidat React Hook Form a Zod až při jejich použití. Začít jedním polem a pochopit tok hodnot, blur validace a submitu.
3. Postupně doplnit základ, čas a volitelné údaje. Polohu zatím předat testovací hodnotou nebo izolovaným vstupem; mapový picker patří Fázi 7.
4. Ověřit konec po začátku a výsledný konec v budoucnosti. Prázdný konec používá společný helper; stejné pravidlo později znovu zkontroluje server.
5. Zajistit zachování hodnot, inline chyby, propojené popisky a přesun fokusu na první chybu.
6. Upravit mobilní a desktopové rozložení podle specifikace bez předčasného ukládání nebo draftu.

## Ověření a konec

- Automaticky chránit hranice textů, URL, souřadnic a časových vztahů ve sdílené validaci. Historická uložená událost se neposuzuje jako nový formulář.
- Component testy chrání načasování chyb, fokus a zachování hodnot. U DST stačí propojení chyby do formuláře; výpočty už pokrývá 2B.
- HTML-like popis zůstává textem. Bez polohy nelze vytvořit platný vstup API.
- Existující testy, lint, typecheck, build a responzivní kontrola projdou. Fáze 7 připojí skutečnou polohu a POST.
