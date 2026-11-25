# Fáze 7 – Výběr polohy, uložení a návrat

> Režim: studentka implementuje. Mentor pomáhá propojit formulář, Leaflet, repository a Next.js navigaci bez hotového řešení.

**Větev:** `07-location-persistence`

**Závisí na:** mapě a kartě z Fáze 2A rozšířených ve Fázích 4–5, GPS z Fáze 5, formuláři z Fáze 6 a repository z Fáze 3

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
- Převod formulářových hodnot vytvoří normalizovaný `MapEvent` s unikátním ID `user:<UUID>` a UTC ISO časy podle kontraktu Fáze 3. ID nesmí kolidovat se seed ani lokálními záznamy.
- Úspěšný návrat předá ID události a jednorázový stav `Event added`; hlavní route poté odstraní přechodné parametry.

## Mentoringové kroky

1. Nejprve nakreslit tok polohy: GPS nebo kliknutí, pin, formulář, uložený `Event`.
2. Ověřit blokování uložení bez pinu; využít existující formulářové pokrytí a doplnit jen chybějící případ.
3. Přidat kliknutí na mapu a přesun existujícího pinu.
4. Přidat drag pinu a ověřit poslední souřadnice.
5. Připojit GPS; odmítnutí zachová ruční mapu.
6. Na desktopu použít jednu mapu vedle plovoucího formuláře; na mobilu mapovou sekci ve formuláři.
7. Napsat test převodu validních formulářových hodnot na `MapEvent` včetně unikátního uživatelského ID.
8. Při prázdném konci uložit výsledek existujícího `getDefaultEventEnd`; nevytvářet druhý výpočet. Ověřit pravidla vytváření proti předanému `now`.
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
- Přidání nezmění jiné lokální záznamy včetně historie a neplatných položek; kolize ID nebo nečitelný obsah skončí chybou se zachováním formuláře.
- Úspěšný zápis zobrazí novou událost a jednorázovou zprávu.
- Reload zachová událost, ale neotevře panel.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Automatický draft.
- Reverzní geokódování.
- Finální recovery UI poškozených uložených dat.
- Editaci historie; skončenou událost už uživatel nesmí zpětně upravovat. Serverové vynucení patří k budoucímu backendu.

## Doporučený závěrečný commit

`feat: persist user-created events`

## Handoff

Do `status.md` zapsat tok location pickeru, návrat mezi routes, chování zápisu, query cleanup a první krok Fáze 8. Důležité map/form/navigation poznatky uložit do `memory/07-*.md`.
