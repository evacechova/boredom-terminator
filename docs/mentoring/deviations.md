# Odchylky od specifikace a plánů

Tento dokument zaznamenává vědomé změny, které ovlivňují rozsah, architekturu, pořadí práce nebo vývojový proces. Běžné opravy překlepů sem nepatří.

## 2026-11-02 – Mapa s mock daty před úplnou doménou

**Původně:** Fáze 2 připravovala úplné typy, pražský čas, filtry, řazení a Google Maps odkazy. Leaflet přicházel až ve Fázi 5 po repository a discovery UI.

**Nově:** Studentka schválila Fázi 2A na větvi `02-event-map`: zjednodušené funkční demo s minimálním typem, dvěma až třemi pevnými mock událostmi, mapou Prahy, výběrem pinu a základní kartou události. Karta obsahuje název, zobrazený čas, místo a volitelný popis; lze ji zavřít a používá mobilní spodní i desktopové boční rozložení. Základní ovládání klávesnicí a fokus jsou součástí dema. Původní doménový rozsah se přesouvá do Fáze 2B na větvi `02b-event-domain`.

**Důvod:** První viditelný výsledek má ověřit propojení dat, Next.js a mapy před zaváděním pravidel, která UI zatím nepoužívá.

**Dopad:** Produktová specifikace zůstává beze změny. Minimální `MapEvent` je dočasný vývojový model, který Fáze 2B rozšíří na úplný model bez paralelních datových toků. Pevné mock události nenahrazují finální relativní seed factory z Fáze 3. Fáze 4 napojí již existující mapu na repository a filtry; Fáze 5 rozšíří již existující kartu o úplná pole a externí odkazy a přidá GPS. Fáze 8 ověří a rozšíří přístupnost napříč aplikací; základní přístupnost karty neodkládáme. Každá fáze má vlastní větev, commit a PR. Dnešní hodinový blok cílí na typ a mock data, nikoli dokončení celé mapy.

## 2026-10-26 – Rozdělení Fáze 1 na samostatné pull requesty

**Původně:** Fáze 1 spojovala scaffold, vývojové nástroje, testovací infrastrukturu, základní UI, téma a první deployment do jedné větve a jednoho závěrečného review.

**Nově:** Fáze 1A na větvi `01-nextjs-foundation` končí připravenou testovací infrastrukturou. Fáze 1B na větvi `01-foundation-ui` obsahuje component test, základní stránku, daisyUI téma a první deployment.

**Důvod:** Menší pull requesty mají jasnější účel, rychlejší review a nevážou dokončený setup na následnou vizuální práci.

**Dopad:** Vznikl plán `01b-foundation-ui.md`. Číslování a obsah Fází 2–10 se nemění. Fáze 1B závisí na merge Fáze 1A.

## 2026-10-25 – Learner-led mentoring místo agentické implementace

**Původně:** Jeden agentický plán předpokládal, že asistent implementuje úkoly a samostatní agenti je kontrolují.

**Nově:** Studentka píše produkční kód a testy. Asistent vysvětluje koncepty, zadává malé kroky, kontroluje změny a stupňuje nápovědu. Kód mění pouze na výslovnou žádost.

**Důvod:** Hlavním cílem projektu je učení během mentoringu, ne nejrychlejší dodání hotové aplikace.

**Dopad:** Původní agentický plán byl nahrazen a před kontrolním commitem odstraněn. Aktivní roadmapa používá samostatný plán, větev a kontext pro každou fázi.

## 2026-10-25 – Instalace závislostí až při jejich použití

**Původně:** Původní plán instaloval většinu knihoven při scaffoldingu.

**Nově:** Každá fáze přidá pouze knihovny, které právě vysvětluje a používá.

**Důvod:** Studentka lépe uvidí účel každé závislosti a změny zůstanou menší.

**Dopad:** `package-lock.json` se může změnit ve více fázích.

## 2026-10-25 – První nasazení ve Fázi 1

**Původně:** Původní plán odkládal veřejné nasazení na poslední fázi.

**Nově:** Fáze 1 nasadí základní Next.js stránku. Poslední fáze provede finální produkční ověření.

**Důvod:** Odpovídá prvnímu mentoringovému úkolu a včas odhalí problém s hostingem.

**Dopad:** Veřejná URL vznikne brzy a bude se průběžně aktualizovat.

## 2026-10-25 – Názvy větví bez prefixu `phase/`

**Původně:** Větve implementačních fází používaly formát `phase/NN-name`.

**Nově:** Větve používají formát `NN-name`, například `01-nextjs-foundation`.

**Důvod:** Číslo zachovává vazbu na roadmapu a pořadí. Prefix `phase/` nepřidával užitečnou informaci o obsahu změny.

**Dopad:** Roadmapa, plány fází, handoff a pravidla spolupráce používají nový formát názvů větví. Počet commitů ve větvi se nemění; fáze může obsahovat jeden nebo více logických commitů.
