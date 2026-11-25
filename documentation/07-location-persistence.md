# Fáze 7 – Poloha a vytvoření přes REST

**Větev:** `07-location-persistence`. **Závisí na:** GET a databázi z Fáze 4, GPS z Fáze 5 a formuláři z Fáze 6.

**Výsledek:** Návštěvník vybere polohu, odešle POST a uvidí uloženou událost na mapě i v jiném prohlížeči.

**Specifikace:** [MVP](mvp.md), části REST a databáze, Přidání události.

## Soubory a odpovědnosti

- Formulář a jeho mapový picker: poslední poloha pinu, převod hodnot a klientský `fetch`.
- `src/app/api/events/route.ts`: POST, vstupní validace a stavové kódy.
- `src/data/events.ts`: `createEvent` přijme validovaný obsah a vrátí uložený `MapEvent`; přidělení ID a `createdAt` je serverové.
- Discovery celek: zobrazení události vrácené POSTem a jednorázový návrat; obnovení seznamu je samostatná operace.

## Kroky

1. Nakreslit tok kliknutí/GPS → pin → formulář → POST → validace → databáze → odpověď → mapa.
2. Připojit kliknutí, přesun a přetažení jediného pinu; GPS využije stejnou hodnotu. Ukládá se poloha události, nikoli obecný GPS stav návštěvníka.
3. Přidat POST podle specifikace. Odmítnout chybný JSON a neplatná data, znovu spočítat efektivní konec a zkontrolovat jej proti serverovému času. Klient neposílá vlastní ID ani datum vytvoření.
4. Implementovat parametrizovaný INSERT. Potvrzení `201` vrátit až po úspěšném zápisu; existující události včetně historie se nemění.
5. Propojit submit přes `fetch`, zpracovat HTTP status i odpověď a zobrazit serverové chyby. Při probíhajícím požadavku blokovat další submit.
6. Po potvrzeném POST použít vrácený `MapEvent` pro jednorázový návrat, `Event added`, vycentrování a otevření detailu. Zajistit viditelnost nové události i mimo původní filtr, například přepnutím na její pražský den. Úspěšný návrat nepodmiňovat dalším GET; případná chyba obnovení seznamu nesmí označit uložení za neúspěšné ani nabídnout opakovaný POST.
7. Odstranit jednorázové návratové parametry, aby reload neotevřel detail znovu. Chyby zachovají formulář; nejasný výsledek síťové chyby nesmí vyvolat automatický další POST.
8. Při výpadku dlaždic zachovat hodnoty; GPS může dodat polohu. Bez mapy i GPS vysvětlit, proč nelze pokračovat.

## Ověření a konec

- Integračně ověřit validaci POST i při obejití formuláře, skutečný zápis a následný GET z oddělené testovací databáze.
- Odmítnutý vstup nezapisuje; chyba INSERTu nehlásí úspěch a nezmění existující data. Historie a ukázky přežijí přidání.
- Component test chrání poslední polohu, zachování hodnot, blokování dvojího submitu a pořadí potvrzený zápis → návrat. Nevytvářet druhou sadu testů společné validace.
- Ověřit zvlášť úspěšný POST následovaný chybou obnovení seznamu: vytvořená událost zůstane dostupná z odpovědi, potvrzení uložení platí a další POST se neodešle.
- Nová událost je viditelná i při původně neslučitelném filtru; reload a jiný prohlížeč ji načtou bez automatického otevření detailu.
- Existující testy, lint, typecheck, build a mobilní i desktopový průchod projdou.
