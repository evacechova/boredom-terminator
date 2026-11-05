# Boredom Terminator – stav a handoff

## Otevřené požadavky 5. 11. 2026

- Na následnou žádost studentky hlavička používá `justify-between`: logo vlevo, nadpis vpravo s `text-right`. Responzivní velikosti a odsazení od krajů zůstávají. Cílený ESLint, Prettier a kontrola diffu prošly; vizuální kontrola zbývá.

- Ještě doladit vzájemné umístění, překryv a viditelnost detailního panelu a plovoucího pluska na mobilu i desktopu. Současné skrývání pluska při otevřeném detailu je prozatímní řešení, nikoli uzavřené UX rozhodnutí.
- Později přidat clusterování pinů při menším zoomu (oddálení mapy), aby se blízké události seskupovaly. Konkrétní fáze, chování a knihovna zatím nejsou určené; nyní neimplementovat. Požadavek je zachovaný také v `docs/product/future-ideas.md` pro budoucí plánování.

### Checkpoint 5. 11. 2026 – Detail přes mobilní obrazovku

- Studentka změnila zadání: plus je znovu aktivní, velikost používá `clamp(3rem, 8vw, 4rem)` a SVG polovinu velikosti tlačítka. Odkaz stále vede na `/events/new`; samotný formulář dosud není implementován.
- Stránka předává plovoucí odkaz přes `children` do `EventDiscovery`. Ten jej vykreslí pouze bez vybrané události; nevzniká další stav ani nová klientská hranice.
- Mobilní detail nyní používá `fixed inset-0` a překrývá i hlavičku. Od `sm` zůstává pravým plovoucím panelem, znovu dole bez rezervy na plus. Křížek zůstává; šipka zpět je odložená.
- Prošly testy 8/8 včetně skrytí a obnovení odkazu při otevření a zavření detailu, lint a formátování. Vizuální kontrola ve skutečném prohlížeči zbývá.

### Checkpoint 5. 11. 2026 – Responzivní hlavička a ikonové ovládání

- Na výslovnou žádost studentky mentor upravil hlavičku: logo a nadpis jsou vedle sebe i na mobilu. Logo používá `clamp(2.5rem, 8vw, 5rem)`, nadpis `clamp(1.125rem, 4vw, 2.25rem)`; mezery a odsazení mají responzivní utility.
- `Add event` je plovoucí kruhové plus vpravo dole podle opraveného zadání. `ButtonLink` přijímá `disabled`, `className` a `aria-label`. Na výslovný požadavek zachovává `href`; neaktivitu odkazu zajišťuje `inert`, `aria-disabled` a `tabIndex=-1`, nikoli nepodporovaný HTML atribut `disabled`. V `buttons.css` jsou explicitní disabled styly.
- Zavření panelu používá SVG křížek s přístupným názvem `Zavřít`. Panel je nad plovoucím tlačítkem a od breakpointu `sm` má šířku 20rem vpravo. Stávající Escape handler zůstává.
- Prošly testy 7/7, lint, typecheck, cílený Prettier, kontrola diffu a produkční Webpack build. Vizuální kontrola na mobilu a desktopu a ověření `inert` ve skutečném prohlížeči zatím neproběhly. Commit nebyl vyžádán.

### Checkpoint 5. 11. 2026 – Sdílené UI komponenty

- Na výslovnou žádost studentky mentor vytvořil `src/components/ui/ButtonLink.tsx` a nahradil jím odkaz `Add event` na hlavní stránce. Přijímá `href` typu `LinkProps["href"]` a `children` typu `ReactNode`; zachovává navigaci i třídy `btn btn-primary`. Server/client rozhodnutí bylo společně vysvětleno před implementací.
- Prošly testy stránky 3/3, cílený ESLint, Prettier, projektový typecheck a kontrola diffu. Build se v tomto kroku nespouštěl.
- Studentka zvolila pro `Logo` Server Component, protože jde o statické zobrazení. Mentor následně vyčlenil `src/components/ui/Logo.tsx` a zapojil ho do stránky. Zachovány obrázek, rozměry, alternativní text i `priority`. Po vyčlenění znovu prošly testy stránky 3/3, cílený ESLint, Prettier, projektový typecheck a kontrola diffu.
- Samostatný nadpis a akční `Button` nyní nevznikají. Commit nebyl vyžádán.

> Aktualizováno 4. 11. 2026. Tento soubor je výchozí bod každého nového kontextu.

### Požadavek 5. 11. 2026 – Základ design systému

- Po souhlasu studentky doplněny pohybové tokeny `--duration-normal: 300ms` a `--ease-standard: ease-in-out`. Přechod transformace pinů používá oba tokeny; jeho délka a průběh se nemění. Cílený Prettier a kontrola diffu prošly.

- Na následnou výslovnou žádost studentky mentor vytvořil základní strukturu: `src/styles/tokens.css` obsahuje stávající daisyUI téma a sdílené hodnoty gradientu a fokusu, `buttons.css` přidává ombré pro `btn-primary`, `focus.css` sdílí pravidlo `:focus-visible`. Specifická pravidla SVG markerů jsou v `src/components/event-map/event-map.css`; vše importuje `globals.css`.
- Tlačítka a piny používají stejné konce gradientu. SVG prstenec zachovává vlastní geometrii a sdílí barvu fokusu. Nové React komponenty nevznikly.
- Po změně prošly testy 5/5, lint, typecheck, cílený Prettier, kontrola diffu a produkční Webpack build. V sestaveném CSS ověřena přítomnost tokenů, gradientu tlačítek a markerů. Turbopack build v runneru selhal na zakázaném otevření portu; Webpack vyžadoval síťový přístup ke Google Fonts. Vizuální kontrola gradientu a klávesnicového fokusu zbývá studentce.

- Studentka chce pro odkaz `Add event` stejný jemný svislý ombré přechod jako u pinů: nahoře primary zesvětlená o 18 % bílé, dole základní primary. Současná primary je `#0f766e`.
- Tento vzhled má tvořit první sdílený vizuální princip budoucího design systému. Zaznamenání požadavku neznamená schválení technické architektury.
- Návrh k diskusi: sdílené CSS proměnné pro oba konce gradientu, oddělená pravidla tlačítek a markerů; zachovat Tailwind a daisyUI. Sdílené React komponenty zůstávají samostatným navazujícím krokem.
- Původní diskuse produkční kód ani testy neměnila; následná žádost výše výslovně autorizovala vytvoření struktury a zapojení stylů. Testy mentor neměnil.

## Aktuální priorita – schváleno 5. 11. 2026

Tento checkpoint nahrazuje starší zadání dokončit celý původní rozsah 2A před PR. Studentka schválila rozdělení na 2A a 2A.2 kvůli velikosti review. Větev 2A.2 bude `02a2-event-map-ui`, doménová fáze zůstává 2B a následuje až po ní.

Nyní dokončit pouze fokus do karty a návrat na marker, test tlačítka zavření, kontrolu diffu a závěrečná ověření současného dema na mobilu, desktopu a preview. Potom závěrečný commit a PR podle AGENTS.md. Obsah karty nad rámec názvu, boční panel a rolování, map-config.ts a loading stav patří do plánu `docs/superpowers/plans/02a2-event-map-ui.md`. Další designové úpravy a sdílené UI komponenty nejsou podmínkou uzavření 2A.

Studentka navrhla fokus na název události. Další malý krok: vysvětlit rozdíl mezi programovým fokusem nadpisu, pohybem Tab a klávesou Escape. Zatím nebyl změněn produkční kód ani testy.

## Aktuální stav

- Schválená produktová specifikace: `docs/superpowers/specs/2026-10-24-mvp-design.md`.
- Learner-led mentoring podle `AGENTS.md`: studentka píše produkční kód i testy, mentor vysvětluje a kontroluje.
- Fáze 1B je podle potvrzení studentky sloučená do `main`. Přesný merge commit a production deployment v tomto kontextu zatím nebyly ověřeny.
- Aktivní větev je `02-event-map`. Studentka potvrdila pull merge Fáze 1B; nevyžadovat opakovanou synchronizaci bez nového důkazu.
- Landing page, vlastní daisyUI téma, testy a oprava metadat jsou hotové. Veřejná URL: `https://boredom-terminator.vercel.app`.
- Poslední zdokumentované ověření Fáze 1B: testy 3/3, lint, format check, typecheck, Webpack build v runneru a lokální Turbopack build. Nové ověření implementace v tomto kontextu neproběhlo.
- Studentka 2. 11. 2026 schválila změnu pořadí: nejdřív zjednodušené funkční demo: minimální typ, mock data, mapa, výběr pinu, základní karta, zavírání, fokus a mobilní i desktopové UI; úplná doména, časy a filtry až potom.
- Další implementační fáze je **2A – zjednodušené funkční demo**, plán `docs/superpowers/plans/02-event-domain.md`, cílová větev `02-event-map`.
- Původní doménový rozsah je zachován ve Fázi 2B: `docs/superpowers/plans/02b-event-domain.md`, větev `02b-event-domain`.
- Dokumentační checkpoint nové roadmapy vzniká na výslovnou žádost studentky na větvi `02-event-map`. Produkční kód ani testy mentor nemění.

## Aktuální mentoringový checkpoint

- Studentka vytvořila `src/domain/events/types.ts` s exportovaným `MapEvent`: povinné `id`, `title`, `startsAt` a `location.latitude`/`longitude`; volitelné `description` a `venueName`.
- Vysvětleny odpovědnosti složek domain/data/components/app, objektový typ, vnořený objekt, rozdíl type/interface, volitelné vlastnosti a UTC ISO řetězec. Typ `string` sám formát času za běhu neověřuje.
- `npm run typecheck` po vytvoření typu prošel 2. 11. 2026.
- Studentka potvrdila, že merge již pullnula. Dřívější lokální Git pozorování není podklad pro další požadavek na rebase; opakovaný fetch/rebase nezadávat bez nového důkazu.

- `src/data/mock-events.ts` obsahuje typované pole `mockEvents` s první minimální událostí `mock-1`. Mentor ji vložil na výslovnou žádost studentky. Volitelná pole jsou vynechána.
- Vysvětlen rozdíl mezi typem pole a hodnotou pole, `import type`, alias `@/` a zápis skutečného objektu. Typecheck první mock události prošel.

## Checkpoint první mapy

- Nainstalované Leaflet 1.9.4, React Leaflet 5.0.0 a vývojové typy @types/leaflet 1.9.22.
- `LeafletMap.tsx` vykresluje Prahu přes MapContainer a OpenStreetMap TileLayer s atribucí a Leaflet CSS. Mapa nyní přes `absolute inset-0` vyplňuje relativně pozicovaný main pod hlavičkou; vnější obal má h-dvh. Studentka ověřila zobrazení v prohlížeči.
- `EventMap.tsx` používá next/dynamic s `ssr: false`; serverová stránka jej vykresluje vedle původního obsahu. Mock data zatím mapa nepoužívá.
- Studentka ověřila mapu v prohlížeči. Ověření 2. 11. 2026: Jest 3/3, lint, format check, typecheck a `npx next build --webpack` prošly. Standardní Turbopack production build tohoto checkpointu zatím nebyl ověřen.
- Varování Jest o aktualizaci mimo `act(...)` je vyřešené: test stránky nahrazuje EventMap mockem vracejícím null. Jest konfigurace mapuje alias `@/` na `src/`; mock používá `__esModule: true` pro rozpoznání default exportu. Po opravě prošly testy 3/3 bez warningu, formátování změněných souborů a kontrola diffu. Oprava tvoří samostatný checkpoint `test: isolate homepage from Leaflet loading`.
- Studentka hlásila npm audit 35 nálezů ve vývojových nástrojích; `npm audit --omit=dev` podle jejího výstupu hlásí 0. Nepoužívat slepě audit fix --force; navrhoval downgrade Jest a ESLint. Tooling audit je otevřený samostatný úkol.
- U každé nové komponenty studentka nejdřív sama rozhodne server/client a vysvětlí důvod, podle nového pravidla AGENTS.md. Zadání dávat slovně a nechat ji napsat řešení; neprozrazovat kód předem.

## Otevřená kontrola pro konec Fáze 2A

- Na žádost studentky později vytvořit sdílené komponenty pro tlačítka a nadpisy. Nyní je neimplementovat; tento navazující úkol povinně zmínit v popisu PR Fáze 2A. Poznámka je také v plánu fáze v části „Poznámka pro popis PR a navazující práci“.
- Kontrola načítacího obalu je uzavřená: `EventMap` byl po dohodě odstraněn, viz aktuální checkpoint níže.

## Checkpoint markerů z mock dat

- `page.tsx` předává `mockEvents` přes typované props EventMap do LeafletMap; mapa vykresluje Marker pro každou událost s klíčem podle ID.
- Rozbité výchozí ikony měly 404 pro retina obrázek a stín. Na výslovnou žádost studentky přidán `marker-icon.ts`: statické PNG importy z balíčku Leaflet, URL přes normalizaci řetězce nebo objektu se `.src`, explicitní `icon()` se standardními rozměry a ukotvením. Ikona je předána každému Markeru, globální výchozí nastavení se nemění.
- Nepoužité kopie PNG vytvořené během diagnostiky v public/leaflet byly odstraněny po ověření shody s originály.
- Samotné `.src` v dev režimu selhalo: generovaný Turbopack bundle exportuje PNG z balíčku jako URL řetězec. `getImageUrl` podporuje řetězec i objekt se `.src`; oba tvary ověřeny izolovaným spuštěním skutečného modulu s náhradou importů.
- Po opravě prošly Jest testy 3/3, lint, typecheck, formátování a Webpack build. Studentka 4. 11. 2026 potvrdila správné zobrazení pinu a stínu v prohlížeči. Vercel preview ještě zbývá ověřit.

## Nejbližší krok

### Checkpoint 5. 11. 2026 – zavírání přes Escape

- Studentka doplnila do `EventPanel` posluchač `keydown` na `window` v `useEffect`. Klávesa `Escape` volá `onClose`; cleanup odpojuje stejný posluchač a efekt má závislost `[onClose]`.
- Studentka potvrdila funkčnost v prohlížeči. Mentor zkontroloval aktuální kód a `npm run typecheck` prošel.
- `EventDiscovery` používá ternární podmínku pro vykreslení panelu. Změna má podle dohody být součástí commitu s další částí; commit zatím neprovádět.
- Component testy ověřují jedno zavolání `onClose` při `Escape` a žádné při `Backspace`. Studentka testy napsala; mentor na výslovnou žádost opravil matcher a UTC čas testovacích dat.
- Ověření: všech 5 testů prošlo, lint a format check prošly; typecheck po opravě testů také prošel. Build pro tento checkpoint nebyl spuštěn.
- Další krok: řízení fokusu. Starší zadání přidat `Escape` a jeho dva testy je tímto splněné. Před commitem oddělit nebo zkontrolovat také souběžné změny markerů a mapových stylů.

### Aktuální checkpoint po zjednodušení komponent

- Studentka vytvořila `EventDiscovery` a stránka jí předává `mockEvents`. Výběr drží `useState<string | null>` s počátečním `null`.
- Na výslovnou žádost studentky mentor odstranil `EventMap.tsx` a přesunul dynamický import bez SSR přímo do `EventDiscovery`. Toto rozhodnutí nahrazuje starší poznámky o zachování a porovnání props obalu.
- `LeafletMap` přijímá `onEventSelect` a při kliknutí na marker předává jeho ID. `EventDiscovery` odvozuje `selectedEvent` přes `find` a podmíněně vykresluje `EventPanel`.
- `EventPanel` zobrazuje název a tlačítko „Zavřít“, které přes `onClose` nastavuje výběr na `null`. Má dočasné spodní umístění nad mapou a podtržení tlačítka při hoveru. Studentka ověřila přepínání názvu mezi piny, zavření a opětovné otevření v prohlížeči.
- Před checkpoint commitem 4. 11. 2026 prošly testy 3/3, lint bez varování, format check, typecheck a Webpack production build. Test stránky mockuje `EventDiscovery`; samostatné testy karty ještě nejsou napsané. Turbopack a Vercel preview zůstávají neověřené.
- Studentka doplnila `onMapClick` z `EventDiscovery` do `LeafletMap` a pomocnou komponentu `MapClickHandler` ve stejném souboru. Je vykreslená pod `MapContainer`, přes `useMapEvents` zachytí kliknutí a zavolá předané zavření. Před commitem prošly testy 3/3, lint, format check a typecheck. Samostatné ověření tohoto chování v prohlížeči studentka zatím výslovně nepotvrdila.
- Nejbližší mentoringový krok: ověřit otevření pinem, zavření prázdnou mapou a opětovné otevření jiným pinem; potom navázat zavíráním přes `Escape`. Studentka chce nejprve vysvětlení účelu a prostor navrhnout další krok, nikoli detailní diktování kódu. Před dalším zadáním vždy přečíst aktuální kód; při nepochopení otázku přeformulovat a nechat studentku odpovědět.

1. Na výslovnou žádost studentky mentor 4. 11. 2026 doplnil do `mockEvents` události `mock-2` a `mock-3` s různými souřadnicemi v Praze. Jedna má `venueName` a `description`, druhá volitelná pole vynechává. Typecheck a Prettier kontrola souboru prošly. Studentka potvrdila zobrazení tří markerů v prohlížeči. Výběr a základní karta jsou již implementované podle checkpointu výše.
2. Před dokončením fáze přesunout mapovou konfiguraci z komponenty do map-config.ts podle plánu; zatím je inline.
3. Navázat výběrem události a základní kartou. Ověřit Vercel preview větve `02-event-map`. Základní layout mapy pod hlavičkou je hotový; plovoucí karta a ovládání teprve přijdou. Finální hlavička a footer zatím nejsou rozhodnuté. Pokračovat po malých mentoringových krocích.

## Známé limity

- Dočasné logo `public/boredom-terminator-logo-full.png` má přibližně 1,5 MB; optimalizace neblokuje mapu.
- Alternativní `public/boredom-terminator-logo.png` se záměrně zachovává.
- Preview deployment může vyžadovat přihlášení k Vercelu.
- Turbopack build v Codex runneru může narazit na omezení portu CSS child procesu. Ověřený fallback je `npx next build --webpack`; standardní Turbopack build ověřit lokálně.

## Tooling checkpoint

- Flat config zachovává `eslint-config-next/core-web-vitals` a `eslint-config-next/typescript`.
- Vlastní pravidla vynucují jednoduchý control flow, striktní porovnávání, blokové závorky, `const` a omezení `console` a `any`.
- `max-depth`, `complexity`, `no-console` a `@typescript-eslint/no-explicit-any` jsou varování; ostatní vlastní pravidla jsou chyby.
- Prettier používá středníky, dvojité uvozovky, dvě mezery, trailing commas `all` a šířku `100`.
- `eslint-config-prettier` je načtený před vlastními pravidly, aby explicitní `curly: ["error", "all"]` zůstalo aktivní.
- Skripty `lint`, `lint:fix`, `format`, `format:check` a `typecheck` jsou připravené.
- Jest, React Testing Library, DOM Testing Library, jest-dom, jsdom prostředí, `ts-node` a typy Jestu jsou nainstalované.
- `jest.config.ts` používá `next/jest`, prostředí `jsdom` a společný setup `jest.setup.ts`; skripty `test` a `test:watch` jsou připravené.
- `allowScripts` výslovně zakazuje instalační skripty `unrs-resolver` a `@parcel/watcher`; `npm install-scripts ls` nehlásí žádné nezkontrolované skripty.
- Po schválení byly Prettierem upraveny pouze čtyři dříve neformátované soubory.
- Ověření `npm run lint`, `npm run format:check` a `npm run typecheck` prošlo 25. 10. 2026.
- Tooling checkpoint je commit `c2a8326 chore: configure code quality tooling`.

## Scaffold checkpoint

- Výchozí dokumentační checkpoint je commit `a588d6c docs: simplify phase branch names`.
- Scaffold checkpoint je commit `01cfc09 chore: scaffold Next.js application`.
- Po scaffold checkpointu následoval tooling checkpoint `c2a8326`.

### Checkpoint 5. 11. 2026 – CARTO Positron

- Na výslovnou žádost studentky mentor změnil pouze konfiguraci podkladu v `LeafletMap.tsx` na CARTO Positron (`light_all`, včetně popisků), doplnil atribuci CARTO, subdomény `abcd` a maximální zoom 20.
- Klíč se načítá z `NEXT_PUBLIC_CARTO_API_KEY`. Studentka připravila ignorovaný `.env.local` a proměnné na Vercelu. Hodnota klíče nebyla vypisována.
- Cílený ESLint, Prettier a projektový typecheck prošly. Studentka potvrdila správný vzhled mapy v prohlížeči. Build ani deployment v tomto kroku neproběhly.
- Rozpracované testy a komponenty panelu mentor neměnil. Limity poskytovatele jsou v `docs/mentoring/memory/02-carto-basemap-limits.md`.

### Checkpoint 5. 11. 2026 – Vlastní event piny

- Na výslovnou žádost studentky mentor nahradil modré PNG piny vlastním inline SVG přes Leaflet `divIcon`. Pin používá petrolejovou barvu tématu, světlý lem, bílou tečku a jemný stín. SVG ponechává prostor pro budoucí symbol kategorie.
- Vybraný marker je mírně zvětšený, má grafitový prstenec a vyšší z-index. Výběr používá stávající `selectedEventId` předané do mapy; nový stav nevznikl. Špička zůstává ukotvená na souřadnicích. Fokus má také viditelný prstenec; marker má název události.
- Cílený ESLint, Prettier a kontrola diffu prošly. Celkový typecheck, lint a Jest blokuje rozpracovaný `EventPanel.test.tsx` (nedokončené deklarace a JSX). Test stránky prošel: 3 testy. Mentor rozepsaný test neměnil.
- Vzhled v prohlížeči a build zatím nebyly ověřeny. Další krok: vizuálně zkontrolovat piny na mapě, výběr a fokus; potom pokračovat rozepsaným testem panelu.

### Checkpoint 5. 11. 2026 – Animace výběru pinu

- Studentka potvrdila, že po restartu dev serveru mají piny správné barvy. Před restartem server posílal CSS bez pravidel event-marker, přestože na disku byla.
- Na žádost studentky doplněn přechod transformace `180ms ease-in-out`. Výběr nyní přepíná CSS třídu na existujícím markeru přes callback ref; nevyměňuje ikonu, aby Leaflet znovu nevytvářel SVG a nepřerušoval přechod. Duplicitní selectedMarkerIcon odstraněna.
- Vizuální ověření animace v prohlížeči zatím neproběhlo.

- Na další žádost studentky přechod prodloužen na `300ms ease-in-out`. Kontrola `public/` a `src/` nenašla žádné staré obrázky pinů ani stínů; kopie byly odstraněny už dříve. Obrázky dodávané balíčkem Leaflet v node_modules se nemažou. Prettier změněného CSS a kontrola diffu prošly; plynulost zbývá posoudit v prohlížeči.

### Checkpoint 5. 11. 2026 – Jemnější vzhled pinů

- Na výslovnou žádost studentky upraven vzhled: grafitový obrys 1.25 px, jemný svislý SVG gradient od petrolejové zesvětlené o 18 % bílé k základní petrolejové a slabší stín (16 %). Prstenec výběru a fokusu ztenčen na 4 px. Přechod transformace zůstává 300 ms ease-in-out.
- Cílený ESLint, Prettier a kontrola diffu prošly. Vzhled gradientu zbývá ověřit v prohlížeči studentkou.

- Studentka upřesnila vzhled: světlý vnitřní lem má zůstat. Na její žádost obnoven 3px světlý lem, pod něj přidán 4px grafitový tah (viditelný vnější okraj 0.5 px na každé straně). Tečku nahradila vlastní bílá SVG pacička. Gradient a animace zůstávají. Výběrový prstenec je širší než obrys, aby zůstal viditelný. Cílený lint, Prettier a kontrola diffu prošly; vizuální ověření zbývá.

### Checkpoint 5. 11. 2026 – Kapička a obrys podle výběru

- Na žádost studentky pacičku nahradila off-white kapička špičkou dolů. Používá base-100 stejně jako světlý lem.
- Odstraněn trvalý grafitový obrys. Běžný pin má pouze světlý 3px lem; vybraný pin navíc tenký off-black okraj (4px tah pod světlým lemem). Klávesnicový fokus zachovává stejný viditelný okraj. Gradient a animace zůstávají.
- Cílený ESLint, Prettier a kontrola diffu prošly. Vizuální ověření zbývá studentce.

- Na další žádost studentky nahrazena kapička off-white tečkou o poloměru 5 px a obnoven tah výběrového prstence 5.5 px. Běžný pin nadále nemá tmavý obrys. Cílený ESLint, Prettier a kontrola diffu prošly.

- Studentka upřesnila požadavek na silnější tmavý obrys při výběru: tah prstence nastaven na původních 7 px. Tečka zůstává off-white (base-100), běžný pin pouze se světlým lemem. Prettier CSS a kontrola diffu prošly.

### Checkpoint 5. 11. 2026 – Enter a fokus nadpisu

- Studentka přidala keydown handler markeru: Enter volá onEventSelect s ID události. EventPanel používá useRef, tabIndex=-1 a efekt závislý na event.id pro fokus nadpisu.
- Studentka ověřila v prohlížeči otevření Enterem, fokus nadpisu a Shift+Tab na zavírací tlačítko. Tlačítko je v DOM před nadpisem.
- Prošly testy 8/8, lint a typecheck. Návrat fokusu na marker zatím není implementovaný; jde o nejbližší krok. Build se pro tento checkpoint nespouštěl.
- Pro návrat fokusu studentka správně určila potřebu ID události; zbývá propojit ID s DOM prvkem markeru. Nové testy Enteru a fokusu zatím nevznikly.
