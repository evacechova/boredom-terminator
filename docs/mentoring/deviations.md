# Odchylky od specifikace a plánů

Platná rozhodnutí měnící rozsah, architekturu nebo postup. Podrobnosti patří do odkazovaných plánů; historii variant uchovává Git.

## 2026-11-22 – Výsledky utilit a URL recovery

Jednoduché helpery vracejí hodnotu nebo `undefined`; jediný druh chyby nepotřebuje diskriminovaný objekt. Převod místního času dál rozlišuje chyby vstupu, pásma a DST. Kontrakty jsou v [plánu 2B](../superpowers/plans/02b-event-domain.md). URL recovery je výslovně ponechané [Fázi 4](../superpowers/plans/04-discovery-ui.md).

## 2026-11-22 – Navigace už ve 2B

Napojení Google Maps Directions do existujícího `EventPanel` se přesouvá z Fáze 5 do 2B. Navigace funguje i bez názvu místa a nevyžaduje vlastní GPS; neplatná URL skryje pouze odkaz. Na mobilu i desktopu používá statické `target="_blank"` a `rel="noopener noreferrer"`, aby zachovala kontext aplikace bez detekce šířky. Chování popisuje [plán 2B](../superpowers/plans/02b-event-domain.md). Vizuální hierarchie detailu zůstává odložená.

## 2026-11-22 – Minimální testování

TDD není povinné. Nové testy chrání konkrétní nepokryté pravidlo nebo riziko; jednoduché změny lze ověřit spustitelným příkladem či existujícími kontrolami. Pravidla v [AGENTS.md](../../AGENTS.md) mají přednost před staršími požadavky plánů na test jako první krok.

## 2026-11-21 – Souběh 2B a 3, integrita dat a historie

- Jediná výjimka ze sekvenčního vývoje: 2B a 3 běží ve vlastních worktrees a chatech nad společným základem. 2B vlastní časovou doménu; 3 seed, Zod a storage. Nejprve merge 2B, potom integrace aktuálního `main` do 3. Fáze 4 čeká na obě. Postup upravuje [roadmapa](../superpowers/plans/README.md).
- Společný `MapEvent` se bez dohody nemění. UTC ISO časy, volitelné `endsAt`, společný dvouhodinový konec a předaný `now` platí pro oba proudy. Přesné rolling a DST hranice určuje [plán 2B](../superpowers/plans/02b-event-domain.md).
- Historické události zůstávají platné a nemažou se automaticky; výchozí filtr je pouze skryje. Skončené události nesmějí být zpětně upravované. Budoucí backend musí zachovat autora a zákaz úprav vynucovat serverově; editace ani backend nejsou součástí tohoto kroku.
- Běžné přidání zachovává původní lokální položky včetně neplatných a historických. Nečitelná data ani selhání čtení nesmějí vést k přepsání storage. `removeInvalid` zachová platnou historii; potvrzený reset smaže lokální události včetně historie, nikoli seed ani jiné klíče. Browser storage není záloha.
- Nová uživatelská ID mají formát `user:<UUID>`. Při čtení má seed přednost před lokální kolizí a mezi lokálními položkami první platný záznam. Duplicity se hlásí; `add` kolidující ID odmítne bez zápisu. Datovou validaci a operace určuje [plán 3](../superpowers/plans/03-local-repository.md).

## 2026-11-16 – Městská část mimo MVP

MVP neobsahuje `district`, `PragueDistrict`, jejich výběr, filtr ani fallback názvu místa. Zůstávají souřadnice, `city: "Praha"` a volitelné `venueName`. Návrat městské části vyžaduje další dohodu.

## Model a výchozí konec už ve 2A.2

Rozšíření `MapEvent` a `getDefaultEventEnd` se přesunuly z 2B do 2A.2. Každá událost má jednu z osmi kategorií podle [specifikace](../superpowers/specs/2026-10-24-mvp-design.md); taneční styl je odložený. Výchozí konec přičítá dvě uplynulé hodiny a vrací UTC ISO. Časové filtry zůstávají ve 2B, napojení na vytváření ve Fázích 6–7.

## 2026-11-13 – Organizace kódu a testy před commitem

- Sdílená aplikační vrstva se jmenuje `src/core`; její odpovědnost se nemění.
- SVG markeru patří do `src/styles/map-marker.ts`, Leaflet adaptér k mapovým komponentám a sdílené React komponenty do `src/components/ui`. Vzhled tak nezávisí na mapové knihovně.
- Husky `pre-commit` spouští `npm test`. Hook nenahrazuje závěrečné ověření fáze.

## 2026-11-05 – Mobilní detail a mapový podklad

- Mobilní detail zabírá celou obrazovku včetně hlavičky; desktop používá plovoucí panel. Plusko se při otevřeném detailu skrývá. Zavírání křížkem zůstává, šipka zpět je odložená.
- CARTO Positron nahrazuje standardní dlaždice OpenStreetMap. Vyžaduje `NEXT_PUBLIC_CARTO_API_KEY` a viditelnou atribuci OpenStreetMap i CARTO. Podmínky a jejich kontrolu před komerčním použitím popisuje [projektová paměť](memory/02-carto-basemap-limits.md).

## 2026-11-05 – Rozdělení dema na 2A a 2A.2

Kvůli menším review uzavírá 2A základ mapy, výběr, zavírání a fokus. Obsah karty, responzivní rolování, mapová konfigurace a loading stav patří do 2A.2; potom následuje 2B. Fáze 8 přístupnost rozšíří, její základy se neodkládají.

## 2026-11-04 – Dynamické načítání bez obalu EventMap

Samostatný `EventMap` pouze předával props. Dynamický import s `ssr: false` proto zajišťuje přímo rodič mapy a panelu, nyní `EventMapContainer`.

## 2026-11-02 – Viditelné demo před úplnou doménou

Mapa s pevnými mock daty předchází časové doméně a repository, aby nejdřív ověřila propojení UI a mapy. Fáze 4 napojí existující mapu na repository a filtry; Fáze 5 rozšíří detail a přidá GPS. Mock data nenahrazují relativní seed z Fáze 3. Pořadí určuje [roadmapa](../superpowers/plans/README.md).

## 2026-10-26 – Rozdělení Fáze 1

Menší PR oddělují 1A (scaffold, nástroje a testovací infrastruktura) od navazující 1B (základní UI, component test a první deployment).

## 2026-10-25 – Mentoring a postupné zavádění

- Studentka vlastní produkční kód a testy; mentor mění kód jen na výslovnou žádost. Cílem je učení podle [AGENTS.md](../../AGENTS.md).
- Závislosti se instalují až ve fázi, která je použije, aby byl zřejmý jejich účel.
- První deployment probíhá už ve Fázi 1; závěrečná fáze ověří celé MVP.
- Větve používají formát `NN-name` bez prefixu `phase/`. Každá fáze má vlastní plán, větev a jeden či více commitů.
