# Fáze 7 – Výběr polohy, uložení a návrat

> Režim: studentka implementuje. Mentor pomáhá propojit formulář, Leaflet, repository a Next.js navigaci bez hotového řešení.

**Větev:** `phase/07-location-persistence`

**Závisí na:** mapě z Fáze 5, formuláři z Fáze 6 a repository z Fáze 3

**Výsledek:** Uživatel zvolí polohu mapou nebo GPS, uloží platnou událost a vrátí se na mapu s otevřeným panelem nové události.

**Specifikace:** části 10, 11 a 13.

## Na co se soustředíme

- Řízená hodnota vlastního formulářového prvku.
- Propojení React Hook Form s mapovým pinem.
- Rozdíl mezi aktuální GPS polohou a uloženou polohou události.
- Atomické pořadí: nejdřív trvalý zápis, potom navigace.
- Předání jednorázového výsledku mezi routes bez trvalého ukládání panelu.
- Chování formuláře při selhání `localStorage` nebo dlaždic.

## Veřejná rozhraní fáze

- `LocationPicker` vrací poslední souřadnice pinu.
- Převod formulářových hodnot vytvoří normalizovaný `Event` s UUID a UTC ISO časy.
- Úspěšný návrat předá ID události a jednorázový stav `Event added`; hlavní route poté odstraní přechodné parametry.

## Mentoringové kroky

1. Nejprve nakreslit tok polohy: GPS nebo kliknutí, pin, formulář, uložený `Event`.
2. Napsat failing test stavu bez pinu.
3. Přidat kliknutí na mapu a přesun existujícího pinu.
4. Přidat drag pinu a ověřit poslední souřadnice.
5. Připojit GPS; odmítnutí zachová ruční mapu.
6. Na desktopu použít jednu mapu vedle plovoucího formuláře; na mobilu mapovou sekci ve formuláři.
7. Napsat test převodu validních formulářových hodnot na `Event`.
8. Při prázdném konci uložit vypočtený dvouhodinový konec.
9. Napsat test, že repository zápis proběhne před navigací.
10. Přidat úspěšný návrat, vycentrování nové události, otevření panelu a `Event added`.
11. Po načtení odstranit přechodné URL parametry, aby reload panel znovu neotevřel.
12. Testovat chybu zápisu: zůstat na formuláři, zachovat hodnoty a umožnit retry.
13. Testovat výpadek dlaždic: zachovat hodnoty; GPS může dodat polohu; bez mapy i GPS zůstává poloha neplatná.

## Testy a ověření

- Kliknutí, další kliknutí a drag nastavují poslední polohu.
- GPS úspěch i odmítnutí mají očekávané chování.
- Ukládá se poloha události, ne obecný GPS stav uživatele.
- Selhání zápisu nenaviguje a neztratí hodnoty.
- Úspěšný zápis zobrazí novou událost a jednorázovou zprávu.
- Reload zachová událost, ale neotevře panel.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Automatický draft.
- Reverzní geokódování.
- Finální recovery UI poškozených uložených dat.

## Doporučený závěrečný commit

`feat: persist user-created events`

## Handoff

Do `status.md` zapsat tok location pickeru, návrat mezi routes, chování zápisu, query cleanup a první krok Fáze 8. Důležité map/form/navigation poznatky uložit do `memory/07-*.md`.
