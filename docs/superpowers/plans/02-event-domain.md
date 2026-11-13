# Fáze 2A – Zjednodušené funkční demo

> Režim: studentka píše produkční kód i testy. Mentor vysvětluje nové pojmy a zadává jeden malý krok najednou.

**Větev:** `02-event-map`

**Závisí na:** sloučené Fázi 1B.

**Výsledek:** Hlavní stránka zobrazí mapu Prahy a několik markerů z typovaných mock dat. Kliknutí na marker otevře základní kartu detailu; demo funguje na mobilu i desktopu.

**Specifikace:** části 5, 6, 8 a 16; záměrně jde o zjednodušené demo, nikoli finální MVP.

## Schválené zúžení rozsahu 5. 11. 2026

Tento oddíl má přednost před původním checklistem a podmínkami níže. Studentka schválila rozdělení kvůli velikosti review.

Fáze 2A končí současnou mapou, mock markery, výběrem události a kartou s názvem. Před uzavřením zbývá dokončit přesun fokusu do karty a návrat na marker, test tlačítka zavření, kontrolu diffu a ověření dema na mobilu i desktopu včetně přepínání a všech způsobů zavření. Současné rozložení musí zůstat použitelné a zachovat dostupné Add event a atribuci. Platí společné kontroly, preview, handoff, závěrečný commit a schválený PR podle AGENTS.md.

Do Fáze 2A.2 se přesouvá čas, místo a popis s testy, desktopový boční panel a rolování dlouhého obsahu, map-config.ts a loading stav. Další designové úpravy a sdílené UI komponenty nejsou podmínkou uzavření 2A. Podrobný rozsah je v `02a2-event-map-ui.md`. Doménová fáze zůstává 2B.

## Rozsah a struktura

- `src/domain/events/types.ts`: minimální `MapEvent` s `id`, `title`, `startsAt` (UTC ISO), volitelným `description` a `venueName` a `location` obsahující číselné `latitude` a `longitude`.
- `src/data/mock-events.ts`: dvě až tři pevné ukázkové události v Praze, typované pomocí `MapEvent`. Nejde ještě o relativní seed factory.
- `src/components/event-map/map-config.ts`: střed Prahy, zoom a konfigurace OpenStreetMap dlaždic včetně atribuce.
- Dynamický import mapy bez SSR a loading stav zajišťuje přímo `EventDiscovery`; samostatný obal `EventMap` byl po dohodě 4. 11. 2026 odstraněn.
- `src/components/event-map/LeafletMap.tsx`: Leaflet mapa, dlaždice a markery s přístupným názvem; přijímá události a callback výběru. Kliknutí do prázdné mapy zavře kartu.
- `src/components/event-map/EventDiscovery.tsx`: klientský vlastník `selectedEventId`; vybranou událost odvozuje z předaných dat, propojuje mapu a kartu. Bez repository, filtrů a controller hooku navíc.
- `src/components/event-map/EventPanel.tsx`: karta s názvem, zobrazeným časem, místem a volitelným krátkým popisem; tlačítko zavření, `Escape` a řízení fokusu.
- `src/components/event-map/EventPanel.test.tsx`: obsah, chybějící volitelné údaje, změna vybrané události a zavírání.
- `src/app/page.tsx`: zůstává Server Component, předává mock data klientskému discovery celku a zachovává branding a odkaz `Add event`.
- `src/app/globals.css`: Leaflet CSS a minimální responzivní rozložení s výslovnou výškou mapy.
- `src/app/page.test.tsx`: upravit jen podle skutečné změny stránky; zachovat testy brandingu a odkazu.

Názvy souborů jsou výchozí návrh pro mentoring. Případnou změnu domluvit před jejich vytvořením. Typ popisuje jen potřeby mapy a karty; úplný model přijde ve Fázi 2B.

## Malé mentoringové kroky

- [ ] Vysvětlit objektový typ, číselné souřadnice a rozdíl mezi TypeScript kontrolou a runtime validací.
- [ ] Studentka navrhne `MapEvent` a dvě až tři mock události se stabilními ID a různými souřadnicemi v Praze.
- [ ] Spustit `npm run typecheck` a zkontrolovat tvar dat.
- [ ] Vysvětlit DOM, Server/Client Component a proč samotné `"use client"` nevypíná předrenderování.
- [ ] Při použití nainstalovat Leaflet, React Leaflet a potřebné TypeScript typy; zkontrolovat kompatibilitu a instalační skripty.
- [ ] Vykreslit prázdnou mapu Prahy přes dynamický import bez SSR, načíst CSS, nastavit výšku a viditelnou atribuci.
- [ ] Zobrazit jeden jednoduchý marker; vyřešit jeho assety nebo použít jednoduchý vlastní placeholder.
- [ ] Převést předané mock události na markery se stabilním React klíčem a přístupným názvem.
- [ ] Napsat component test základní karty: název, čas, místo, volitelný popis; absence volitelných údajů nezanechá prázdné řádky.
- [ ] Přidat `selectedEventId` a odvozenou vybranou událost. Kliknutí na jiný pin změní obsah stejné karty.
- [ ] Přidat zavření tlačítkem, `Escape` a kliknutím do prázdné mapy; přesun fokusu do karty a po zavření na původní marker.
- [ ] Na mobilu zobrazit spodní panel, na desktopu pravý plovoucí panel. Dlouhý obsah může rolovat a nesmí skrýt zavření.
- [ ] Čas mock události pouze zobrazit přes `Intl.DateTimeFormat` s výslovným `Europe/Prague`. Nevytvářet převod vstupního pražského času na UTC ani časové filtry; obecné časové funkce přijdou ve Fázi 2B.
- [ ] Ověřit mapu na mobilní i desktopové šířce a zachovat dostupný odkaz `Add event`.
- [ ] Zkontrolovat diff, ověření a handoff; navrhnout commit a připravit PR podle AGENTS.md.

## Ověření a podmínky dokončení

- Mapa zobrazuje Prahu, dlaždice a čitelnou atribuci OpenStreetMap.
- Každá mock událost má marker na svých souřadnicích; kliknutí otevře kartu odpovídající události.
- Karta zobrazí název, čas, místo a dostupný popis. Výběr jiného markeru změní její obsah.
- Zavření tlačítkem, `Escape` i prázdnou mapou funguje; reload kartu neobnoví.
- Mobilní spodní a desktopový boční panel mají použitelný layout i při dlouhém obsahu.
- Markery mají přístupný název a lze je aktivovat klávesnicí; fokus přejde do karty a po zavření se vrátí.
- Mobilní ani desktopové rozložení neschová mapu nebo `Add event`.
- Obnovení stránky a produkční build nezpůsobí `window is not defined` ani chybu hydratace.
- Component testy ověřují vlastní UI; skutečné dlaždice se ověří v prohlížeči, nikoli síťovým požadavkem v Jestu.
- Projdou `npm test`, `npm run lint`, `npm run format:check`, `npm run typecheck` a produkční build. Pro omezení runneru lze použít zdokumentovaný Webpack fallback; Turbopack ověřit lokálně.
- Preview deployment funguje; fáze má závěrečný commit, schválený PR a merge před další fází.

## Co sem nepatří

Kompletní model události, kategorie, městské části, převody vstupního času, časová pravidla, filtry, řazení, Google Maps a source odkazy, relativní seed data, repository, localStorage, GPS a formulář. Karta je záměrně základní; rozšíření nesmí blokovat dokončení dema.

## Dnešní hodinový blok

Cíl je minimální typ a mock data, kontrola typů a vysvětlení hranice pro mapu. Pokud zbude čas, začít prázdnou mapou. Dokončení celého Leaflet zapojení během jedné hodiny není podmínkou.

## Handoff

Zapsat hotové kroky, přesný další malý úkol, ověřovací příkazy a mapový client boundary. Fáze 2B rozšíří tentýž datový tok o úplný model a doménová pravidla.

## Poznámka pro popis PR a navazující práci

- Studentka požaduje později vytvořit sdílené UI komponenty pro tlačítka a nadpisy. V této části zatím používáme přímo HTML prvky; vyčlenění komponent je navazující úkol, nikoli podmínka dokončení Fáze 2A.
- Při přípravě popisu PR Fáze 2A výslovně uvést tento odložený úkol. Konkrétní API a rozsah komponent navrhnout až při jejich implementaci.

## Samostatné mentoringové bloky

1. Minimální typ a mock data.
2. Prázdná mapa a Next.js client boundary.
3. Markery z dat a výběr události.
4. Základní karta a zavírání.
5. Mobilní a desktopové rozložení, fokus a ověření veřejného dema.

Jde o více sezení na jedné větvi a jeden výsledný PR. Každý blok končí kontrolovatelným checkpointem; žádný nevyžaduje dokončení celého dema za hodinu.

**Navržený commit:** `feat: add simplified event discovery demo`

## Závěrečná kontrola props mapy

- [x] Prověřit přínos načítacího obalu: po dohodě 4. 11. 2026 odstraněn `EventMap`, dynamické načítání přesunuto do `EventDiscovery`. Props mapy nyní definuje pouze `LeafletMapProps`; Context není potřeba.
