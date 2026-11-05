# Fáze 5 – Rozšíření karty a GPS

> Režim: studentka implementuje. Mentor podrobně vysvětluje Leaflet, dynamický import a browser API.

**Větev:** `05-map-panel-gps`

**Závisí na:** discovery stavu z Fáze 4

**Výsledek:** Existující demo získá úplné informace v kartě, externí odkazy a uživatelem spuštěné GPS centrování. Mapa, základní karta a responzivní layout jsou již hotové z Fáze 2A.

**Specifikace:** části 8, 9, 11, 15 a 16.

## Na co se soustředíme

- Proč Leaflet závisí na DOM a nemůže běžet při server renderu.
- Dynamický import a hranice Client Component.
- Rozdíl mezi Leaflet map state a React application state.
- Browser Geolocation API, oprávnění a chybové kódy.
- Fokus a klávesové ovládání markeru a panelu.
- Responzivní layout bez dvou rozdílných datových toků.

## Veřejná rozhraní fáze

- Centralizovaná konfigurace dlaždic, atribuce, středu Prahy a zoomů.
- `EventMap` jako dynamicky načtená hranice.
- `EventPanel` ovládaný přes `selectedEventId`.
- `useGeolocation` se stavem idle/loading/success/error.

## Mentoringové kroky

1. Zkontrolovat mapu a její client boundary z Fáze 2A; mapu ani konfiguraci nevytvářet podruhé.
2. Ověřit stávající CSS, výšku mapy a responzivní rozložení před přidáním panelu.
3. Rozšířit existující kartu o podkategorii, úplné datum a čas, fallback městské části a podmíněný source odkaz.
4. Zachovat jediný výběrový stav, mapu a markery z Fáze 4; nezakládat druhou implementaci panelu.
5. Regresně ověřit button semantics, `Enter`, `Space` a přístupné názvy markerů z Fáze 2A.
6. Napsat test obsahu event panelu včetně chybějících volitelných dat.
7. Zachovat mobilní spodní a desktopový pravý panel; ověřit delší obsah a nová pole.
8. Propojit místo s přesnými souřadnicemi v Google Maps.
9. Regresně ověřit zavření tlačítkem, `Escape` a kliknutím do prázdné mapy.
10. Ověřit stávající přesun fokusu do panelu a návrat na marker i po změně filtrů.
11. Přidat `Use my location`; GPS pouze vycentruje mapu.
12. Testovat permission denied, unavailable a timeout.

## Testy a ověření

- Produkční build nehlásí `window is not defined`.
- Markery odpovídají filtrovaným událostem.
- Panel ukáže správná pole a fallback místa.
- `View source` existuje jen s bezpečným URL.
- Google Maps odkaz se na desktopu otevře v novém kontextu a na mobilu ve stejném.
- Zavírání a fokus fungují klávesnicí.
- GPS se spustí pouze po akci uživatele a nemění filtry ani pořadí.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Formulář vytváření události.
- Plný mapový fallback při selhání dlaždic; přijde ve Fázi 8.
- Vlastní emoji markery.

## Doporučený závěrečný commit

`feat: add event map and panel`

## Handoff

Do `status.md` zapsat mapový client boundary, způsob markeru, GPS stavy, breakpoint panelu a první krok Fáze 6. Leaflet/Next.js zvláštnosti uložit do `memory/05-*.md`.
