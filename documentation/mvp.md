# Boredom Terminator – MVP

> Schválený záměr z 24. 10. 2026; rozsah aktualizovaný 26. 11. 2026 podle dohody se studentkou.

Mobile-first web pro objevování pražských K-pop akcí na mapě. Bez registrace umožní prohlédnout detail, otevřít navigaci a přidat událost do sdílené databáze. Výsledkem mentoringu je veřejné funkční demo.

## Rozsah

- Mapa Prahy, ukázkové události a události přidané návštěvníky.
- Výchozí probíhající a nadcházející události do 24 hodin; alternativně filtr konkrétního dne.
- Detail události, Google Maps navigace a volitelný zdrojový odkaz.
- Formulář, výběr polohy mapou nebo GPS a trvalé uložení na serveru.
- Použitelné loading, empty a error stavy, textový fallback mapy a ovládání klávesnicí.
- Vlastní REST API v Next.js a PostgreSQL na Neonu. Vytvořené události vidí všichni návštěvníci.

Mimo MVP: účty, editace a mazání událostí, městské části, filtr kategorií, fotografie, moderace, sociální funkce, draft, PWA a offline režim. Lokální ukládání událostí se neimplementuje. Kandidáty dalšího vývoje eviduje [bonusová Fáze 10](10-bonus.md).

## Technologie a hranice

Next.js App Router, React, TypeScript, npm; Leaflet + React Leaflet, CARTO Positron, Tailwind + daisyUI a Geist Sans. Formulář používá React Hook Form a Zod; ověření Jest + Testing Library a Playwright Chromium.

Primární jazyk rozhraní je angličtina; datum a čas se zobrazují anglicky v pásmu `Europe/Prague`.

Vzhled je minimalistický, hravý a „cute“, s vlastním světlým tématem. Konkrétní barevné tokeny se udržují v `globals.css`.

Serverová část zůstává ve stejné Next.js aplikaci na Vercelu. Studentka napíše Route Handlers a klientské HTTP požadavky, aby si procvičila REST. Připojení databáze a přístupové údaje zůstávají na serveru; vývoj, preview a produkce mají oddělená data. Neon podporuje [oddělené preview větve](https://neon.com/docs/guides/vercel-managed-integration).

Čistá pravidla patří do `src/core`, databázové operace do datové vrstvy a HTTP obsluha do `src/app/api`. Konkrétní databázový klient nebo ORM se vybere při zahájení Fáze 4. React Context lze přidat při skutečné potřebě sdíleného UI stavu; nenahrazuje server ani databázi.

## Událost a čas

Jediný aplikační model je [MapEvent](../src/core/events/types.ts). Má jednu z osmi existujících kategorií, souřadnice, `city: "Praha"`, začátek, volitelný konec, místo, popis a zdroj. ID a `createdAt` nové události přiděluje server.

- Vstup a zobrazení používají `Europe/Prague`; API předává časy jako UTC ISO, databáze uchovává časové okamžiky.
- Chybějící konec znamená dvě skutečně uplynulé hodiny od začátku, včetně přechodu DST. Používá se existující `getDefaultEventEnd`.
- Výchozí filtr zahrne probíhající události (`startsAt <= now`, efektivní konec `> now`) a nadcházející se začátkem nejvýše `now + 24 hodin` včetně.
- Konkrétní datum nahradí výchozí okno. Rozhoduje pouze začátek od pražské půlnoci včetně do následující půlnoci bez ní; den může mít 23 nebo 25 hodin.
- Neexistující i dvojznačný místní čas se odmítne s rozlišitelnou chybou. Převod nesmí tiše změnit zadaný okamžik.
- Zobrazené události se řadí vzestupně podle začátku. Čisté funkce nemění vstupy a aktuální čas přijímají zvenku.
- Historie se automaticky nemaže. Skrytí filtrem nemění data; načtení nesmí odmítat událost jen proto, že už skončila.

## REST a databáze

| Požadavek          | Úspěšná odpověď                                         | Úloha                                                                                             |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `GET /api/events`  | `200`, `{ events: MapEvent[], demoEvents: MapEvent[] }` | Načíst uložené události včetně historie a oddělené dynamické ukázky; UI filtruje společný seznam. |
| `POST /api/events` | `201`, `{ event: MapEvent }`                            | Ověřit vstup, uložit a vrátit vytvořenou událost.                                                 |

POST přijímá obsah události bez `id` a `createdAt`. Server znovu ověří pravidla formuláře, doplní výchozí konec a vlastní metadata. Neplatný JSON vrací `400`, neplatná data `422`, selhání serveru nebo databáze `500`. Chyby mají tvar `{ error: { message, fields? } }`; `fields` volitelně přiřazuje zprávy formulářovým polím. Odpověď neobsahuje SQL, přihlašovací údaje ani interní stack trace.

Databáze zajišťuje unikátní ID a základní datové invarianty. Dotazy používají parametry; neúspěšné vytvoření nesmí změnit existující události. API oznámí úspěch až po potvrzeném zápisu.

Ukázky vytváří existující `createSeedEvents(now)` při každém GET se stabilními ID a časy vůči předanému aktuálnímu okamžiku. API je vrací odděleně jako `demoEvents`; UI je označí jako fiktivní ukázky. Do databáze se neukládají. Uložené události návštěvníků jsou v `events`, jejich časy se neposouvají a historie se zachovává.

## Mapa a detail

- Výchozí pohled je Praha. Jeden marker odpovídá jedné filtrované události; všechny kategorie mohou používat stejný marker.
- Výběr markeru otevře detail; jiný marker změní jeho obsah. Výběr se neukládá a zmizení události z filtru detail zavře.
- Mobilní detail zabírá celou obrazovku včetně hlavičky, desktopový je plovoucí vpravo. Obsah roluje, zavření zůstává dostupné; při detailu je plusko skryté.
- Detail obsahuje kategorii, název, datum a čas, dostupné místo a popis. Chybějící volitelné údaje nezanechají prázdné řádky.
- `Navigate` otevírá Google Maps Directions na přesné souřadnice i bez názvu místa a bez vyžádání GPS. Používá `target="_blank"` a `rel="noopener noreferrer"`; neplatná navigace skryje pouze odkaz.
- `View source` se zobrazí jen s bezpečným HTTP(S) zdrojem.
- Zavření funguje tlačítkem, klávesou Escape a kliknutím do prázdné mapy. Otevření přesune fokus do detailu, zavření tlačítkem nebo Escape jej vrátí na dostupný původní marker.
- `Use my location` spustí GPS až na akci návštěvníka a pouze vycentruje mapu. Nemění filtr ani pořadí; GPS poloha se neukládá.
- Neplatné, prázdné nebo opakované `date` v URL obnoví výchozí filtr s přístupným oznámením. Opraví se URL bez nové položky historie, zachovají se ostatní parametry a fragment; Back/Forward udržuje UI a URL ve shodě.

## Přidání události

Route `/events/new` obsahuje jeden rolovací formulář: základ, čas, poloha, volitelné údaje a uložení. Na mobilu má vlastní plnoširokou mapovou sekci; na desktopu plovoucí formulář nad interaktivní mapou.

| Pole            | Pravidlo                                                                     |
| --------------- | ---------------------------------------------------------------------------- |
| Název           | Povinný, po trimu 1–100 znaků.                                               |
| Kategorie       | Jedna z osmi hodnot modelu.                                                  |
| Datum a začátek | Povinné, pražský místní čas.                                                 |
| Konec           | Volitelný; výsledný konec musí být po začátku a při vytváření v budoucnosti. |
| Poloha          | Povinné konečné souřadnice v rozsazích ±90 a ±180; město Praha.              |
| Místo           | Volitelné, po trimu nejvýše 120 znaků.                                       |
| Popis           | Volitelný, nejvýše 500 znaků, zobrazený jako text.                           |
| Zdroj           | Volitelný HTTP(S) odkaz, nejvýše 2048 znaků.                                 |

Validace běží po opuštění upraveného pole a při odeslání celého formuláře. Chyby jsou u polí, propojené přes `aria-invalid` a `aria-describedby`; chybný submit přesune fokus na první chybu a zachová hodnoty. Serverová validace je rozhodující a používá stejná odpovídající pravidla.

Výchozí mapa nemá pin. Kliknutí nebo úspěšná GPS ho vytvoří; další kliknutí a přetažení mění tutéž polohu. Ukládají se poslední souřadnice pinu. Zamítnutí GPS neblokuje ruční výběr; timeout a nedostupnost nabídnou opakování.

Po potvrzeném zápisu se aplikace vrátí na mapu, použije událost z odpovědi POST, zajistí její viditelnost, vycentruje ji, otevře detail a zobrazí `Event added`. Úspěch není podmíněný následným GET; chyba obnovení seznamu nesmí zpochybnit potvrzený zápis ani vyvolat opakované vytvoření. Jednorázový stav návratu se odstraní; reload zachová událost, ale neotevře panel. Při chybě ukládání zůstane formulář vyplněný, zobrazí příčinu a umožní další postup; během ukládání se blokuje opakovaný submit.

## Selhání a přístupnost

- Chyba GET není prázdný seznam. Zobrazí se chyba a `Try again`; při opakovaném načítání se nezahodí již zobrazená data. Bez připojení se nepotvrzuje uložení.
- Chyba POST zachová formulář; síťová chyba po odeslání nemusí znamenat, že zápis neproběhl. POST se automaticky neopakuje a UI nesmí tvrdit neověřený výsledek.
- Selhání dlaždic zobrazí `Map couldn't load`, `Try again` a textový seznam se stejnými filtry, řazením a externími odkazy. Poskytovatel se automaticky nemění.
- Ve formuláři výpadek dlaždic zachová hodnoty a vypne výběr na prázdném podkladu. GPS může dodat polohu i bez dlaždic; bez použitelné mapy i GPS zůstává výběr blokovaný s vysvětlením.
- Prázdný filtr ponechá mapu a `Add event`; nabídne `No events found for these filters` a `Reset filters`.
- Markery mají přístupné názvy a klávesnicové ovládání. Ovládací prvky mají popisky a viditelný fokus; barva není jedinou informací, text má použitelný kontrast. Totéž platí pro fallback a chybové stavy.
- CARTO vyžaduje viditelnou atribuci OpenStreetMap a CARTO; provozní poznámka je v [README](../README.md#map-configuration).

## Hotové MVP

- Instalace, testy podle rizika, lint, typecheck a produkční build projdou.
- Veřejná URL nabízí mapu, filtry, detail a vytvoření události; výsledek je dostupný i v jiném prohlížeči.
- Obnovení stránky zachová databázové události včetně historie. Selhání a klávesnicové scénáře odpovídají pravidlům výše.
- Hlavní toky ověří Playwright v desktopovém a mobilním Chromiu bez závislosti na veřejných dlaždicích.
- README obsahuje spuštění, konfiguraci a veřejnou URL. [Roadmapa](roadmap.md) určuje pořadí práce; [status](status.md) aktuální handoff.
