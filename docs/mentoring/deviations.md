# Odchylky od specifikace a plánů

## 2026-11-22 – Napojení Google Maps odkazu už ve 2B

Studentka výslovně přesunula z Fáze 5 do 2B propojení existujícího řádku místa v `EventPanel` s helperem `buildGoogleMapsUrl` a upřesnila jeho účel jako externí navigaci. Textový odkaz „Navigovat“ vede do Google Maps Directions s přesnými souřadnicemi cíle a je dostupný i bez `venueName`. Volitelný název místa se zobrazuje vedle odkazu; neplatné souřadnice odkaz skryjí. Výchozí polohu a trasu řeší Google Maps, aplikace kvůli odkazu nezískává vlastní GPS polohu. Desktopové otevření v novém kontextu a mobilní ve stejném se rozhoduje při aktivaci podle existujícího breakpointu 640 px. Specifikace a oba dotčené plány odpovídají této dohodě. Ostatní rozsah Fáze 5 zůstává zachovaný. Vizuální hierarchii detailu studentka odložila na později; v tomto kroku se neupravuje.

## 2026-11-22 – Minimální testování bez povinného TDD

Studentka výslovně zrušila povinný postup test před implementací a požádala o omezení testů na nutné minimum. Nový test musí chránit konkrétní nepokryté pravidlo nebo reálné riziko; jednoduché kroky lze ověřit spustitelným příkladem, typecheckem, lintem či ručně. Existující relevantní testy se dál spouštějí. Kritická časová pravidla, validace, uchování dat a hlavní uživatelské toky nadále vyžadují odpovídající pokrytí podle schválené specifikace. Metodika se mění, produktové požadavky ani podmínky chování nikoli.

Společné pravidlo je v `AGENTS.md` a roadmapě; příslušné mentoringové kroky aktivních a navazujících plánů již nevyžadují selhávající test jako první krok. Historické záznamy o dřívějším TDD průběhu zůstávají zachované.

## 2026-11-21 – Paralelní vývoj 2B a 3 a zachování historie

Studentka schválila úzce vymezenou výjimku ze sekvenčního postupu. Fáze 2B (`02b-event-domain`) a 3 (`03-local-repository`) mohou běžet ve vlastních worktrees a chatech nad stejným commitem se schválenou společnou dokumentací. Nová fáze 3A nevzniká a funkce se mezi fázemi nepřesouvají. Nejprve se sloučí 2B, potom se aktuální `main` začlení do větve 3 a ověří integrace. Fáze 4 čeká na obě dokončené fáze.

Společný model `MapEvent` z 2A.2 zůstává beze změny názvu a struktury: osm kategorií, `city: "Praha"`, UTC ISO časy a volitelné `endsAt`. Výchozí efektivní konec počítá existující `getDefaultEventEnd`. Nové funkce závislé na aktuálním čase dostávají `now: Date` zvenku. 2B vlastní čas, DST, filtry, řazení a mapové URL; 3 vlastní seed data, Zod a storage. Na nehotové funkce 2B se repository při samostatné implementaci nespoléhá.

Schválené hranice rolling filtru: probíhající událost splňuje `startsAt <= now` a efektivní konec `> now`; nadcházející `startsAt > now` a `startsAt <= now + 24 hodin`. Zvolený den je pražský kalendářní den podle začátku, nikoli pevný UTC interval. Neexistující DST čas má vést k chybě a dvojznačný se nesmí tiše převést. Jednoduchý návrh v plánu 2B odmítá oba druhy místního vstupu bez přidání výběrového UI.

Historické uživatelské události se uchovávají bez automatického mazání, zůstávají platnými záznamy a výchozí aktuální filtr je skryje. Skončenou událost nesmí uživatel zpětně upravovat. Aktuálně se editace, backend, statistiky ani gamifikace neimplementují; při budoucím backendu je nutné zachovat vazbu na autora a zákaz úprav vynucovat serverově. Platná historie přežije i odstranění neplatných položek. Výslovně potvrzený reset nadále smaže všechny lokální uživatelské události včetně historie, nikoli seed nebo jiné storage klíče. MVP neposkytuje backendový archiv ani zálohu proti vymazání browser dat.

Při běžném přidání se zachovají i neplatné původní položky. Nečitelný JSON, nesprávný kořen a chyby čtení nesmějí vést k přepsání úložiště; zápis se odmítne a chyba se předá volajícímu. Seed záznamy zůstávají pouze v kódu. Duplicity ID se hlásí a nevedou k tichému přepsání.

Technické volby plánu pro jednoduchou implementaci: nová uživatelská ID mají formát `user:<UUID>`, stávající seed ID zůstávají zachovaná. Při čtení má seed přednost před kolidující lokální položkou; mezi lokálními záznamy se vrací první platná položka daného ID a další se nahlásí. `add` kolidující ID odmítne bez zápisu. Tyto volby nemění strukturu `MapEvent` a nevyžadují migraci ani nový framework.

Společné dokumentační změny se připravují na `main` a po schválení se commitnou před založením obou worktrees. Mentor commit provádí pouze na výslovnou žádost. Úprava dokumentace sama neznamená spuštění implementace nebo vytvoření worktrees.

## 2026-11-16 – Odložení městské části

Studentka odložila městskou část. Aktuální MVP nebude obsahovat `location.district`, typ `PragueDistrict`, ruční výběr městské části ve formuláři ani filtr podle městské části. Odpadá také fallback názvu místa na městskou část. Souřadnice, `city: "Praha"` a volitelný `venueName` zůstávají. Toto rozhodnutí má přednost před odpovídajícími požadavky původní specifikace a plánů; návrat funkce vyžaduje další domluvu.

## Výchozí délka události v 2A.2

Studentka výslovně přesunula také výpočet výchozího konce do aktuální fáze. Funkce `getDefaultEventEnd` přičítá dvě skutečně uplynulé hodiny k předanému začátku a vrací UTC ISO řetězec. Zatím není napojená na vytváření událostí. Ostatní časová pravidla zůstávají ve 2B.

## Rozšíření modelu ve fázi 2A.2 a kategorie akcí

Studentka přesunula rozšíření modelu z 2B do 2A.2; časová pravidla a filtry zůstávají ve 2B. Kategorie nyní označují typ akce: `random_play_dance`, `cover_shoot`, `dance_class`, `festival`, `party`, `fan_event`, `concert`, `store_event`. Každá událost má jednu povinnou kategorii. Taneční styl se nyní nepřidává. Jde o schválenou změnu oproti třem původním kategoriím specifikace.

## 2026-11-13 – Oddělení SVG vzhledu od mapové knihovny

Po dohodě se studentkou je SVG vzhled markeru v `src/styles/map-marker.ts`. Původně zavedená složka `src/design-system` byla odstraněna; sdílené React komponenty zůstávají v `src/components/ui`. Leaflet adaptér zůstává u mapových komponent. Jde o rozšíření organizačních úprav fáze 2A.2; vzhled a chování markeru se nemění.

## 2026-11-13 – Název společné aplikační vrstvy

Na žádost studentky se `src/domain` přejmenovává na `src/core`. Změna zpřehledňuje názvosloví; odpovědnost vrstvy ani schválená architektura se nemění. Typy událostí jsou nyní v `src/core/events/types.ts`.

## 2026-11-13 – Automatické testy před commitem

Na žádost studentky přidán v pokračování Fáze 2A.2 Husky jako vývojová závislost, skript `prepare` a hook `pre-commit`, který spouští `npm test`. Jde o rozšíření vývojového procesu mimo původní UI rozsah fáze. Lokální hook nenahrazuje závěrečná ověření fáze.

## 2026-11-05 – Mobilní detail přes celou obrazovku

Na výslovnou žádost studentky mobilní detail nahrazuje původní spodní panel plochou přes celou obrazovku včetně hlavičky. Desktop zachovává plovoucí panel vpravo. Plovoucí odkaz pro vytvoření události se při otevřeném detailu skrývá na všech šířkách. Prozatím zůstává zavírání křížkem; šipka zpět je odložená.

Tento dokument zaznamenává vědomé změny, které ovlivňují rozsah, architekturu, pořadí práce nebo vývojový proces. Běžné opravy překlepů sem nepatří.

## 2026-11-04 – Odstranění načítacího obalu EventMap

Na výslovnou žádost studentky byl odstraněn `EventMap.tsx`. Dynamické načítání `LeafletMap` s `ssr: false` nyní zajišťuje přímo `EventDiscovery`. Samostatný obal pouze předával props a ztěžoval porozumění toku dat. Mapa a budoucí panel zůstávají oddělené komponenty. Test stránky nyní nahrazuje `EventDiscovery` místo odstraněného obalu.

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

## 2026-11-05 – Mapový podklad CARTO Positron

Na výslovnou žádost studentky nahrazuje CARTO Positron původně plánované standardní dlaždice OpenStreetMap. Leaflet a datový tok zůstávají zachované. Podklad vyžaduje `NEXT_PUBLIC_CARTO_API_KEY` a viditelnou atribuci OpenStreetMap i CARTO. Podmínky a limity jsou zaznamenané v projektové paměti; před komerčním využitím je nutné je znovu ověřit.

## 2026-11-05 – Rozdělení mapového dema na 2A a 2A.2

Studentka schválila menší rozsah review. Fáze 2A uzavře současnou mapu a kartu s názvem, doplní řízení fokusu a test tlačítka zavření a projde závěrečným ověřením. Čas, místo, popis a jejich testy, responzivní boční panel s rolováním, map-config.ts a loading stav se přesouvají do samostatné Fáze 2A.2 na větvi `02a2-event-map-ui`. Ta předchází doménové Fázi 2B, jejíž název i větev zůstávají zachované. Sdílené UI komponenty a další designové úpravy zůstávají samostatným navazujícím tématem. Produktové požadavky se nemění, mění se rozdělení dodávky.
