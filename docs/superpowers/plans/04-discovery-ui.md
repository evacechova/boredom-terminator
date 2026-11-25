# Fáze 4 – Discovery stav, filtry a textový seznam

> Režim: studentka implementuje. Mentor propojí známý React se server/client hranicí Next.js.

**Větev:** `04-discovery-ui`

**Závisí na:** dokončených a sloučených Fázích 2B a 3, včetně jejich integračního ověření

**Výsledek:** Hlavní route načte události na klientovi, spravuje filtry a výběr události a umí vykreslit přístupný textový seznam vedle již existující mapy z Fáze 2A.

**Specifikace:** části 7, 8, 14 a 15 bez mapové implementace.

## Na co se soustředíme

- Proč stránka může být Server Component, ale `localStorage` potřebuje Client Component.
- Jak zabránit čtení browser API během server renderu.
- Lokální React state bez Reduxu.
- Odvozený stav místo duplicitního ukládání filtrovaných dat.
- Rozdělení controller hooku a prezentačních komponent.

## Veřejná rozhraní fáze

- `useEventDiscovery` drží načtené události, filtry, `selectedEventId` a výsledek načtení.
- `EventFilters` nabízí rolling režim a konkrétní datum; městské části jsou odložené.
- `EventList` zobrazuje seřazené události a později poslouží jako mapový fallback.

## Datum z URL a obnova filtru

- URL recovery patří do této fáze; ve 2B ještě nejsou filtry napojené na UI.
- Datum ověřit jednou přes `filterEventsByDate`: `undefined` je neplatný vstup, `[]` platný den bez událostí. Chybějící parametr znamená výchozí režim; prázdný, opakovaný nebo neplatný parametr se odmítne.
- Pro neplatný odkaz, například `?date=2026-02-29`, zobrazit přístupné oznámení: „Datum v odkazu není platné. Zobrazujeme probíhající a nadcházející události.“ Využít existující UI vzor bez nové závislosti či globálního systému.
- Obnovit rolling filtr a odstranit `date` nahrazením položky historie. Zachovat ostatní parametry a fragment. URL, ovládání a události musí souhlasit i při navigaci historií.
- Poškozené uložené události jsou samostatná chyba datové integrity; jejich validace zůstává na hranici Fáze 3. Nehlásit je jako chybu data v uživatelově odkazu.

## Mentoringové kroky

Ve Fázi 4, po sloučení a integraci Fází 2B a 3, přesunout konfiguraci z `src/components/event-map-container/leaflet-map/map-config.ts` do `src/config/app-config.ts` a upravit její importy. Zachovat centrum mapy, zoom, URL dlaždic, atribuci i ostatní hodnoty. Nový společný soubor zatím obsahuje pouze `defaultEventWindowHours`; během souběhu 2B a 3 se mapová konfigurace nepřesouvá.

1. Nakreslit tok dat od repository přes controller hook do komponent.
2. Rozhodnout, co je zdrojový stav a co lze dopočítat.
3. Ověřit napojení výchozího rolling výsledku; neopakovat doménové hraniční testy z 2B.
4. Ověřit, že konkrétní datum nahradí rolling filtr; nový test přidat jen pro dosud nepokryté propojení.
5. Ověřit reset filtrů a skrytí skončených událostí ve výchozím režimu bez jejich odstranění z načtených dat; využít nejmenší sadu integračních případů.
6. Rozšířit stávající discovery celek z Fáze 2A o controller hook, repository a filtry. Zachovat jediný `selectedEventId`, existující mapu a kartu; filtrované události nahradí přímá mock data. Pokud výběr po filtrování zmizí, kartu zavřít.
7. Vytvořit přístupné formulářové prvky filtrů.
8. Přidat textový seznam a prázdný stav.
9. Ověřit, že server render nesahá na `window.localStorage`.
10. Zkontrolovat, že podkategorie se zobrazuje, ale není filtrem.

## Testy a ověření

- Výchozí rolling filtr ukáže očekávané události.
- Datum mění výsledek; rozhoduje pražský den začátku, včetně případné historie vybraného dne.
- Výchozí režim nezobrazuje skončené události, ale filtrování je nemaže ani nepřepisuje storage.
- `Reset filters` obnoví výchozí režim.
- Integračně ověřit URL recovery podle pravidel výše a platný odkaz včetně prázdného výsledku bez varování. Doménové testy formátů a DST z 2B neopakovat.
- Prázdný výsledek zobrazí správnou zprávu a `Add event`.
- Test zachytí případné čtení `localStorage` při server renderu.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Novou implementaci Leaflet mapy a markerů; existující mapa se pouze napojí na filtrovaná data.
- GPS ani novou implementaci karty; základní karta z Fáze 2A zůstává funkční.
- Recovery akce pro poškozená data.

## Doporučený závěrečný commit

`feat: add event discovery state`

## Handoff

Do `status.md` zapsat tvar discovery stavu, client boundary, hotové filtry a první krok Fáze 5. Důležité Next.js hydration poznatky uložit do `memory/04-*.md`.
