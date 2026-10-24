# Fáze 5 – Leaflet mapa, event panel a GPS

> Režim: studentka implementuje. Mentor podrobně vysvětluje Leaflet, dynamický import a browser API.

**Větev:** `phase/05-map-panel-gps`

**Závisí na:** discovery stavu z Fáze 4

**Výsledek:** Hlavní obrazovka má mapu Prahy, placeholder markery, responzivní panel události a uživatelem spuštěné GPS centrování.

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

1. Nejdřív vykreslit prázdnou mapu Prahy a vysvětlit její životní cyklus.
2. Načíst Leaflet CSS a nastavit skutečnou výšku mapového kontejneru.
3. Přidat jeden statický placeholder marker.
4. Převést filtrované události na markery a propojit výběr s React state.
5. Zajistit button semantics, `Enter`, `Space` a přístupný název markeru.
6. Napsat test obsahu event panelu včetně chybějících volitelných dat.
7. Implementovat mobilní spodní a desktopový pravý plovoucí panel.
8. Propojit místo s přesnými souřadnicemi v Google Maps.
9. Implementovat zavření tlačítkem, `Escape` a kliknutím do prázdné mapy.
10. Přesunout fokus do panelu a po zavření zpět na marker.
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
