# Boredom Terminator – stav a handoff

> Aktualizováno 4. 11. 2026. Tento soubor je výchozí bod každého nového kontextu.

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

### Aktuální checkpoint po zjednodušení komponent

- Studentka vytvořila `EventDiscovery` a stránka jí předává `mockEvents`. Výběr drží `useState<string | null>` s počátečním `null`.
- Na výslovnou žádost studentky mentor odstranil `EventMap.tsx` a přesunul dynamický import bez SSR přímo do `EventDiscovery`. Toto rozhodnutí nahrazuje starší poznámky o zachování a porovnání props obalu.
- `LeafletMap` přijímá `onEventSelect` a při kliknutí na marker předává jeho ID. `EventDiscovery` odvozuje `selectedEvent` přes `find` a podmíněně vykresluje `EventPanel`.
- `EventPanel` zobrazuje název a tlačítko „Zavřít“, které přes `onClose` nastavuje výběr na `null`. Má dočasné spodní umístění nad mapou a podtržení tlačítka při hoveru. Studentka ověřila přepínání názvu mezi piny, zavření a opětovné otevření v prohlížeči.
- Před checkpoint commitem 4. 11. 2026 prošly testy 3/3, lint bez varování, format check, typecheck a Webpack production build. Test stránky mockuje `EventDiscovery`; samostatné testy karty ještě nejsou napsané. Turbopack a Vercel preview zůstávají neověřené.
- Nejbližší mentoringový krok: zavření kliknutím do prázdné mapy. Studentka správně určila, že kliknutí zachytí `LeafletMap`, zatímco stav vlastní `EventDiscovery`. Zatím není doplněn callback pro zavření mapou. Studentka chce nejprve vysvětlení účelu a prostor navrhnout další krok, nikoli detailní diktování kódu.

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
