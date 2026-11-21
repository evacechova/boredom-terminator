# Boredom Terminator – stav a handoff

## 21. 11. 2026 – Aktuální handoff: společná dokumentace pro souběh 2B a 3

- Studentka schválila paralelní vývoj, dokumentační změny i jejich commit a push na `main`. Kód ani testy se nemění. Níže uvedené starší checkpointy jsou historie, nikoli pokyny k pokračování před novým společným základem.
- Ověřený základ: `274a38e` z PR #4 obsahuje sloučenou 2A.2, rozšířený `MapEvent`, osm kategorií, `city: "Praha"`, `formatEventDate` a `getDefaultEventEnd`. Poslední ověření v tomto kontextu před dokumentačními úpravami: 25 testů v 5 sadách a typecheck prošly; build, lint a preview se znovu nespouštěly.
- Aktualizované plány zachovávají společný model a odložené městské části. 2B vlastní časovou doménu a filtry; 3 seed data, Zod a repository. Detaily hranic intervalů, zachování historie a neplatných položek, ID a pořadí merge jsou v plánech a odchylce z 21. 11.
- Kontrola dokumentační změny: cílený Prettier check všech 14 změněných Markdown souborů a `git diff --check` prošly; zkontrolovány hranice odpovědností a návazné plány 4–10. Aplikační testy se kvůli této dokumentační změně znovu nespouštěly. Zásadní blocker souběhu nebyl nalezen; společný commit a následná příprava worktrees zůstávají dalšími kroky.
- Worktrees dosud nevznikly. Větev `02b-event-domain` existuje z úvodní žádosti a stále ukazuje na `274a38e`; větev `03-local-repository` dosud vytvořena nebyla. Společný základ tvoří dokumentační commit obsahující tento handoff (`docs: plan parallel domain and repository work`). Nezačínat implementaci ze starého základu.

### Proud 2B – `02b-event-domain`

- Stav: připravený aktualizovaný plán; produkční práce v této fázi nezačala.
- Po schválení a commitu společné dokumentace začlenit tento základ do dosud prázdné implementační větve a připravit její vlastní worktree a chat podle následného pokynu studentky. První mentoringový krok: vstup a chybový výsledek převodu pražského času, očekávané letní a zimní UTC hodnoty a první failing test.
- Návrh pro DST: neexistující i dvojznačný místní čas odmítnout s rozlišitelnou chybou; bez tiché volby okamžiku. Konkrétní malý kontrakt výsledku a časovou knihovnu probrat při implementaci. Repository toto rozhodnutí neblokuje.

### Proud 3 – `03-local-repository`

- Stav k 21. 11.: vlastní worktree `boredom-terminator-03-local-repository` a větev `03-local-repository` existují nad společným základem `0550180`; druhý worktree s 2B ukazuje na stejný základ. Starší společná poznámka o neexistujících worktrees už pro proud 3 neplatí.
- Studentka vytvořila `src/data/seed-events.ts` s hlavičkou `createSeedEvents(now: Date): MapEvent[]`. Na její výslovnou žádost mentor doplnil první událost: `mock-1`, Random play dance na Vyšehradě, začátek hodinu před `now`, konec pomocí existujícího `getDefaultEventEnd` hodinu po `now`. Vstupní datum se nemění. `createdAt` se odvozuje od `now`. Souřadnice ukázkového místa jsou podle [Encyklopedie Prahy 2](https://encyklopedie.praha2.cz/promena-casem/1426-vysehrad-mapy): 50.064174, 14.418650.
- Jeden parametrizovaný test ověřuje probíhající událost pro dvě různá předaná data a neměnnost vstupu. Nejprve selhal proti prázdnému poli; po doplnění prošlo všech 27 testů v 6 sadách, cílený ESLint a Prettier. Projektový typecheck hlásí `src/app/layout.tsx(20,50): error TS2304: Cannot find name 'LayoutProps'.` Stejná chyba zůstala po `npx next typegen`; layout ani konfigurace se neměnily. Build a prohlížeč se v tomto kroku neověřovaly.
- První krok je commitnutý na výslovnou žádost studentky jako `1a4c6ad` (`feat: add ongoing seed event factory`). Následně studentka potvrdila relativní čas druhé události a výslovně požádala mentora o doplnění všech tří. `mock-2` je Cute Cats cover shoot na Václavském náměstí (`cover_shoot`), od sedmi do deseti hodin po `now`. `mock-3` je Photocard event v Punchy Cup (`fan_event`), začátek za tři pražské kalendářní dny v 9:00 a konec o týden později v 9:00. Soukromý `getPragueMorning` řeší pouze pevný ranní čas seedů pomocí `Intl`; obecný převod místního vstupu zůstává v 2B.
- Souřadnice druhé události jsou orientační bod náměstí podle [PragueHere](https://www.praguehere.com/cs/vaclavske-namesti): 50.0814917, 14.4266722. Bod Punchy Cup podle navigace z [Firmy.cz](https://www.firmy.cz/detail/13698296-punchy-cup-praha-nove-mesto.html) je 50.083236, 14.427107 (Jindřišská 901/5). Jde o ukázkové události, nikoli ověřený program těchto míst.
- Ověření po doplnění: všech 32 testů v 6 sadách, cílený ESLint a Prettier prošly. Nové testy chrání schválený čas coveru, pražské datum poblíž UTC půlnoci a ranní čas i kalendářní týden přes obě změny DST; nejprve selhaly kvůli chybějícím událostem. Typecheck nadále hlásí stejnou chybu chybějícího `LayoutProps`; build ani prohlížeč se nespouštěly. Funkce zatím není napojená na stránku, která stále používá původní mock data. Repository ještě neexistuje. Další mentoringový krok: vysvětlit a navrhnout malé rozhraní repository a výsledek načtení. Studentka požaduje pouze testy s konkrétním přínosem. Studentka následně výslovně požádala o commit doplnění se zprávou `feat: complete relative seed events`.
- Aktuální checkpoint repository: oba seed kroky jsou commitnuté (`1a4c6ad`, `e188694`). Po vysvětlení rozdílu mezi repository a úložištěm studentka výslovně požádala mentora o implementaci repository. Následně zdůraznila audit smysluplnosti testů a požádala o upozornění na vhodný okamžik pro commit; tím samotný commit nepovolila.
- Implementováno `createLocalEventRepository(storage: Storage, now: Date)` v `src/data/local-event-repository.ts`, synchronní kontrakt `EventRepository` a `EventListResult` v `src/core/events/event-repository.ts`. Operace: `list`, `add`, `removeInvalid`, `resetSaved`. Klíč: `boredom-terminator:saved-events:v1`, hodnotou je JSON pole pouze uživatelských záznamů. Čas seedů je snímek předaného `now`; každé načtení vytváří jejich čerstvé objekty. Výsledek má `events`, `invalidCount` a `storageIssue` (`null`, `invalid_format`, `read_error`). Při nečitelném kořenu nelze určit počet neplatných položek, proto je `invalidCount` nula a rozhoduje `storageIssue`.
- `list` nezapisuje; vrací seed a platné lokální záznamy včetně historie. Seed má při kolizi přednost, mezi lokálními položkami se vrací první platná. `add` validuje vstup, odmítá kolizi i s neplatnou původní položkou a připojuje k původnímu poli při zachování historie i neplatných sousedů. Při chybě čtení nebo nečitelném JSON/kořenu nevolá zápis. Recovery mění pouze vyhrazený klíč; čištění zachovává původní platné objekty včetně neznámých polí, nečitelná struktura vyžaduje explicitní reset. Chyby změnových operací se předávají volajícímu.
- Přidán Zod jako přímá runtime závislost (`^4.6.7`, dříve byl v lockfile nepřímo). `src/core/events/stored-event-schema.ts` kontroluje strukturu, všech osm kategorií, UTC časy, souřadnice, HTTP(S) URL a konec po začátku. Historie a chybějící konec zůstávají platné. Exportovaná schémata názvu, místa, popisu a URL sdílejí limity s Fází 6 (100/120/500/2048); čtení texty netrimuje ani nepřepisuje. ID se kontroluje jako neprázdný řetězec; tvorba nového `user:<UUID>` zůstává ve Fázi 7.
- Ověření repository: před implementací selhalo 36 scénářů proti prázdným operacím a propustnému schématu. Po implementaci a auditu prošlo všech 64 testů v 7 sadách, projektový lint a formátování. Testovací `MemoryStorage` je pouze v `src/test-utils`; testy nekontrolují interní `Map` ani texty výjimek. Audit sloučil opakované scénáře nečitelného kořene a smíšeného seznamu, odstranil duplicitní kontrolu nebezpečné URL a opravil falešně pozitivní test kalendářního data. Délka 181 ověřuje skutečný zeměpisný limit namísto výchozího odmítání `Infinity` Zodem. U opravených dvou vstupů bylo samostatně ověřeno, že bez příslušného validačního pravidla projdou. Doplněny kontroly první čisté návštěvy, resetu poškozeného JSON a obsahu seedu při kolizi ID. Nezávislé review nenašlo blokující chybu produkčního kódu; relevantní připomínky k testům jsou zapracované.
- Rozsah a další krok: projektový typecheck stále blokuje známé `src/app/layout.tsx(20,50): error TS2304: Cannot find name 'LayoutProps'.`; v nových modulech další chyby nehlásí. Build ani prohlížeč se v tomto kroku nespouštěly. UI nadále používá původní mock data; napojení repository patří do Fáze 4, UI potvrzení recovery do Fáze 8. Začlenění 2B a společné závěrečné ověření ještě neproběhly, Fáze 3 proto není uzavřená. Repository je připravené na samostatný commit na výslovnou žádost: `feat: add local event repository`. Nejbližší mentoringový krok po commitu: společně projít `list()` a vysvětlit výsledek načtení, poté připravit integraci po merge 2B.
- Studentka po dokončení repository a auditu testů výslovně schválila commit tohoto kroku se zprávou `feat: add local event repository`.
- Na nehotových funkcích 2B nezačínat záviset. Po merge 2B začlenit aktuální `main`, vyřešit případnou integraci a ověřit celek před vlastním PR. Fáze 4 začne až po dokončení obou proudů.

### Nejbližší společný krok

Po úspěšném pushi společného dokumentačního commitu ověřit jeho hash a použít jej jako shodný základ obou proudů. Větev 2B musí tento commit nejprve obsahovat. Založení worktrees a větve 3 vyžaduje následný pokyn studentky; aktuální zadání autorizuje pouze dokumentaci, commit a push. Dalším krokem je příprava worktrees, nikoli automatické zahájení implementace.

## 21. 11. 2026 – Kontrola větve před společnými změnami dokumentace

- Na žádost studentky ověřena větev a pracovní stav a provedeno přepnutí z `02b-event-domain` na `main`. Obě větve ukazují na `274a38e`; dosavadní necommitnutá změna tohoto handoffu zůstala zachovaná.
- Do `AGENTS.md` přidána povinná kontrola větve a pracovního adresáře před úpravami. Společnou dokumentaci pro budoucí větve připravovat na `main`; dokumentaci jednotlivé fáze v její větvi.
- Studentka schválila paralelní práci 2B a 3 a dodala podrobné zadání úprav dokumentace. Zapracování tohoto zadání bylo přerušeno před prvními úpravami a zatím zůstává navazující prací. Worktrees ani další větve nebyly vytvořeny, aplikační kód ani testy se neměnily. Commit nebyl vytvořen.

## 21. 11. 2026 – Zahájení fáze 2B

- Studentka potvrdila stažení aktualizací a merge předchozí fáze. Lokální `main` odpovídá `origin/main` a obsahuje squash commit `274a38e` z PR #4. Z čistého `main` byla vytvořena větev `02b-event-domain` v dosavadním pracovním adresáři.
- Výchozí ověření: všech 25 testů v 5 sadách a typecheck prošly. Build, lint ani preview se v tomto kroku znovu neověřovaly; dřívější omezení buildu jsou zaznamenaná níže.
- Aktivní plán je `docs/superpowers/plans/02b-event-domain.md`, upravený platnými odchylkami: rozšíření modelu, pražský formátovač a samostatný výpočet dvouhodinového konce už vznikly ve 2A.2. Městská část, její typ a filtr zůstávají odložené. Nevytvářet druhý model události ani opakovat hotovou práci.
- První další krok: vysvětlit převod pražského místního data a času na UTC ISO a společně určit očekávané výsledky letního a zimního případu. Poté studentka napíše první failing test; časovou knihovnu vybrat až při implementaci. Produkční kód ani testy mentor v tomto kroku neměnil. Commit nebyl vytvořen.

## 16. 11. 2026 – Příprava PR rozšířené fáze 2A.2

- Studentka schválila přechod k ověření, commitu a pushi před návrhem PR. Aktuálně prošlo všech 25 testů v 5 sadách, typecheck, lint, formátování, kontrola diffu a produkční Webpack build. Omezení standardního Turbopack buildu v runneru je popsané níže.
- Rozsah končí rozšířeným modelem a samostatným výpočtem výchozího konce. Automatické doplnění konce při vytváření a validace konce proti začátku a aktuálnímu času zůstávají navazující prací. Městská část je odložená.
- Další krok: návrh celého PR z `02a2-event-map-ui` do `main` ke schválení, reviewer `bobescz`; preview a screenshoty zatím nejsou doplněné. PR nevytvářet bez schválení obsahu.

## 16. 11. 2026 – Městská část odložena

- Studentka výslovně odložila městskou část včetně jejího filtru a výběru ve formuláři. `district` ani `PragueDistrict` nyní nepřidávat. Platí odchylka z 16. 11.; starší pokyny k doplnění městské části jsou překonané.
- Model polohy zůstává se souřadnicemi a `city: "Praha"`; název místa zůstává volitelný. Další krok: zkontrolovat aktuální model proti zbývajícím požadavkům a ověřit změny. Produkční kód se v tomto kroku neměnil.

## Model polohy – město

- Na výslovnou žádost studentky doplněno povinné `location.city` s literálovým typem `"Praha"`. Hodnota je doplněná v mock datech a testovacích událostech. Typecheck, všech 25 testů a formátování prošly.
- Studentka mezitím doplnila `endsAt?: string`, `sourceUrl?: string` a `createdAt: string`. Další krok modelu je volitelná městská část `district` s typem `PragueDistrict`. Commit nebyl vytvořen.

## Výchozí konec události

- Na žádost studentky doplněno pevné `createdAt: "2026-11-01T12:00:00Z"` do mock dat a základních testovacích událostí. Odvozené fixtures hodnotu dědí přes spread. Typecheck, všech 25 testů a celoprojektová kontrola formátování prošly. Commit nebyl vytvořen.

- Na výslovnou žádost studentky vytvořena čistá funkce `getDefaultEventEnd` v `src/core/events/get-default-event-end.ts`. Přijímá platný ISO začátek a vrací UTC ISO konec po dvou uplynulých hodinách. Není to React hook a zatím se nikde automaticky nevolá.
- Doplněny testy běžného času, přechodu přes půlnoc a obou změn pražského času. Rozsah 2A.2 a odchylky jsou aktualizované. Commit nebyl vytvořen.

## Rozšíření rozsahu 2A.2 – kategorie

- Na výslovnou žádost studentky zaveden `EventCategory` s osmi schválenými hodnotami a povinné `MapEvent.category`. Doplněny mock události a testovací fixtures. Kategorie se zatím nevykresluje.
- Studentka přesunula rozšíření modelu do současné fáze; časová pravidla a filtry zůstávají ve 2B. Další krok: pokračovat zbývajícími poli modelu. Taneční styl je odložený námět. Tyto nové změny nejsou commitnuté.

## Závěrečná kontrola 2A.2

- Studentka následně potvrdila, že v prohlížeči vše funguje; tím jsou potvrzené probírané ruční kontroly včetně rolování, zavírání a loading stavu. Nebylo upřesněno, zda kontrola proběhla na nasazeném preview, proto preview nadále není evidované jako ověřené.

- Prošlo všech 21 testů ve 4 sadách, lint, celoprojektové formátování, typecheck a `git diff --check`. Zkontrolován produkční diff i oba nové konfigurační/formátovací moduly; nebyl nalezen problém vyžadující změnu kódu.
- Standardní build nejprve selhal při stahování Google Fonts. Po opakování s eskalací narazil Turbopack na zákaz otevření portu při zpracování Leaflet CSS (`Operation not permitted`). Produkční build přes `npm run build -- --webpack` prošel. Standardní Turbopack build zůstává k ověření mimo omezení runneru.
- Studentka potvrdila vzhled loaderu i po přidání prodlevy 400 ms. Potvrdila také rolování dlouhého obsahu; dostupnost zavření po odrolování a obě šířky zatím nejsou výslovně potvrzené.
- Zbývá ověřit preview a uvedené ruční podmínky, vytvořit závěrečný commit na výslovnou žádost a připravit PR ke schválení. Fáze zatím není uzavřená. Návrh commit message: `feat: complete event panel and map UI`.

## Loading stav mapy

- Na žádost studentky doplněna prodleva zobrazení loaderu 400 ms přes CSS animaci `visibility` s `step-end`. Při rychlejším načtení komponenty se loader odstraní před zobrazením; mapa se nijak nezdržuje. Tato úprava prodlevy zatím nebyla vizuálně ověřena.

- Dynamický import mapy má loading funkci se spinnerem daisyUI a textem `Načítání mapy…` v obalu `role="status"`. Spinner je skrytý před čtečkami přes `aria-hidden`.
- Na výslovnou žádost studentky přidáno centrování přes `absolute inset-0 flex items-center justify-center gap-2`. Jde o načítání JavaScriptu komponenty, nikoli mapových dlaždic. Studentka následně potvrdila ověření loading stavu v prohlížeči. Prošlo 8 testů kontejneru, typecheck a cílená kontrola formátování. Commit nebyl vytvořen.

## Mapová konfigurace – první krok

- Na výslovnou žádost studentky přesunuty URL CARTO dlaždic včetně čtení `NEXT_PUBLIC_CARTO_API_KEY`, úplná atribuce, subdomény a maximální zoom do objektu `tileLayerConfig` v `map-config.ts`. `LeafletMap` používá jednotlivé položky konfigurace. Hodnoty zůstávají zachované; další krok plánu je loading stav dynamického importu.

- Na další výslovnou žádost studentky zapojeny `mapCenter` a `mapZoom` do props `MapContainer` v `LeafletMap`. Hodnoty zůstávají stejné. Další krok je oddělení konfigurace dlaždic.

- Na výslovnou žádost studentky vytvořen `src/components/event-map-container/leaflet-map/map-config.ts` s exporty `mapCenter: [number, number] = [50.0755, 14.4378]` a `mapZoom = 13` podle současných hodnot v mapě.
- Konstanty zatím nejsou zapojené do `LeafletMap`. Další krok: importovat je a nahradit původní hodnoty props; následně oddělit konfiguraci dlaždic se zachováním CARTO a atribuce. Commit nebyl vytvořen.

## Ruční ověření dlouhého obsahu

- Na žádost studentky dočasně prodloužen popis `mock-2` v `src/data/mock-events.ts` o 20 očíslovaných kol a koncový text `END OF DESCRIPTION`. Studentka ověří rolování a dostupnost zavření na mobilu i desktopu v prohlížeči.
- Studentka potvrdila funkční rolování. Na její žádost obnoven původní krátký popis. Dostupnost zavření po odrolování a jednotlivé šířky nebyly výslovně potvrzené. Mentor prohlížečovou kontrolu neprovedl: browser host byl nedostupný.

## Checkpoint 15. 11. 2026 – Samostatný formátovač data

- Na výslovnou žádost studentky přidán test změny vybrané události přes `rerender`: aktualizuje se název, čas i `datetime`, zmizí původní místo a popis a fokus se vrátí z tlačítka zavření na nadpis. Přepnutí nevolá `onClose`. Všech 8 testů panelu prošlo. Další krok: ověření dlouhého obsahu a dostupnosti zavření na mobilu i desktopu podle plánu 2A.2. Commit nebyl vytvořen.

- Na výslovnou žádost studentky doplněn test chybějícího místa a popisu: název a čas zůstávají zobrazené, nevzniknou žádné odstavce. Všech 7 testů panelu prošlo. Další krok je test přepnutí vybrané události. Commit nebyl vytvořen.

- Na výslovnou žádost studentky doplněn test obsahu karty: místo, popis, pevně očekávaný pražský čas `7. 11. 2026 15:00`, element `time` a zachování původního ISO údaje v `datetime`. Všech 6 testů panelu prošlo. Zbývají testy chybějících volitelných údajů a přepnutí události, následně další kroky plánu 2A.2. Commit nebyl vytvořen.

- Na další výslovnou žádost studentky napojen formátovač do `EventPanel`: element `time` pod nadpisem obsahuje původní ISO údaj v `dateTime` a formátovaný text jako obsah. Napojení je hotové; další krok jsou cílené testy a vizuální ověření.

- Studentka doplnila podmíněné vykreslení místa a popisu v `EventPanel` a potvrdila funkčnost v prohlížeči.
- Na výslovnou žádost studentky vytvořen modul `src/core/events/format-event-date.ts`. Exportovaná funkce `formatEventDate` přijímá ISO řetězec a formátuje datum i čas pro `cs-CZ` v `Europe/Prague`. Formátovač vzniká jednou na úrovni modulu.
- Další krok: studentka importuje funkci do `EventPanel` a zobrazí `startsAt`; následně doplní cílené testy obsahu karty a pražského času. Napojení zatím není hotové. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Schválení commitu struktury

- Studentka výslovně požádala o commit dosavadních změn struktury. Commit zahrnuje přejmenování kontejneru, podsložky mapy a panelu, `core`, přesun vizuálních podkladů do `styles` a související dokumentaci.
- Před commitem prošlo 18/18 testů, typecheck, lint, formátování a kontrola diffu. Build a prohlížeč nebyly v této kontrole ověřovány.

## Checkpoint 13. 11. 2026 – Podsložky mapy a panelu

- Na výslovnou žádost studentky přesunuty `EventPanel.tsx` a jeho test do `src/components/event-map-container/event-panel/`. `LeafletMap.tsx`, jeho test a `marker-icon.ts` přesunuty do sourozenecké složky `leaflet-map/`.
- V `EventMapContainer` upraven import panelu a cesta dynamického importu mapy. `ssr: false` zůstává zachované. SVG a mapové CSS zůstávají v `src/styles`; sdílené UI v `src/components/ui`.
- Prošlo 18/18 testů, typecheck, cílený ESLint, Prettier a kontrola diffu. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Schválené oddělení UI a stylů

- Studentka schválila zachování `components/ui` pro sdílené React komponenty a `styles` pro vizuální podklady. SVG markeru přesunuto do `src/styles/map-marker.ts`, import v Leaflet adaptéru upraven a prázdná složka `src/design-system` odstraněna.
- Tento checkpoint nahrazuje předchozí umístění SVG v `design-system`. Oddělení SVG od Leaflet adaptéru zůstává zachované.
- Prošlo 18/18 testů, typecheck, cílený ESLint, Prettier a kontrola diffu. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Oddělení vzhledu markeru

- Na výslovnou žádost studentky přesunut SVG řetězec markeru do `src/design-system/map-marker.ts` jako `mapMarkerSvg`. Soubor nemá závislost na Leafletu ani Reactu.
- `src/components/event-map-container/marker-icon.ts` SVG importuje a nadále zajišťuje Leaflet `divIcon`, CSS třídu, rozměry a ukotvení. SVG obsah i nastavení ikony zůstávají zachované. Nová React komponenta nevznikla.
- Před změnou i po ní prošlo 18/18 testů. Po změně prošel typecheck, cílený ESLint, Prettier a kontrola diffu. Vizuální kontrola v prohlížeči neproběhla. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Mapové styly ve společné složce

- Na výslovnou žádost studentky přesunut `event-map.css` do `src/styles/event-map.css` a upraven import v `src/app/globals.css`. Obsah CSS zůstal bajtově shodný; přesun byl ověřen porovnáním obsahu.
- Cílený Prettier a kontrola diffu prošly. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Přejmenování domain na core

- Na výslovnou žádost studentky přejmenována složka `src/domain` na `src/core`. Všech sedm importů typu `MapEvent` v produkčním kódu a testech nyní používá `@/core/events/types`.
- Jde pouze o změnu názvu; oddělení společných typů a pravidel od UI a datové vrstvy zůstává zachované. Starší dokumentace může používat původní cestu `src/domain`.
- Prošlo 18/18 testů, typecheck, cílený ESLint, Prettier a kontrola diffu. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Přejmenování mapového kontejneru

- Na další výslovnou žádost studentky přejmenována složka `src/components/event-map` na `src/components/event-map-container`. Upraveny importy stránky, testovací mock a CSS import v `globals.css`. Název souboru `event-map.css` zůstává. Po přesunu prošlo 18/18 testů, typecheck, cílený ESLint, Prettier a kontrola diffu.
- Na výslovnou žádost studentky přejmenován `EventDiscovery` na `EventMapContainer`, včetně props typu, souboru komponenty, souboru testů, importu ve stránce a mocku v testu stránky.
- Název zdůrazňuje rodičovskou roli vůči `LeafletMap` a `EventPanel`. Sdílený `ButtonLink` zůstává v `components/ui`; chování se nemění.
- Před změnou i po ní prošlo 18/18 testů. Po změně prošel typecheck, cílený ESLint, Prettier a kontrola diffu. Commit nebyl vytvořen.

## Checkpoint 13. 11. 2026 – Zahájení pokračování 2A.2

- Fáze 2A je na lokálním `main` sloučená commitem `e812cea` (`#3`). Pracovní strom byl před vytvořením větve čistý.
- Vytvořena a aktivována větev `02a2-event-map-ui` z `main`. Tento údaj nahrazuje starší označení aktivní větve níže.
- Pokračování vychází z plánu `docs/superpowers/plans/02a2-event-map-ui.md`: obsah karty, testy, dlouhý obsah a rolování, mapová konfigurace a loading stav.
- Studentka požaduje doplnit Husky pro automatické spouštění testů a upravit složkovou strukturu. Přesný hook a cílová struktura zatím nejsou dohodnuté; jde o rozšíření k návrhu, nikoli dokončený setup.
- Další krok: vyjasnit zamýšlenou změnu struktury, dohodnout rozsah automatických kontrol a potom aktualizovat plán. Produkční kód ani testy mentor v tomto kroku neměnil.
- Na výslovnou žádost studentky mentor nainstaloval Husky jako vývojovou závislost. Instalace ještě neaktivuje hook; následuje inicializace a ověření `pre-commit` pro testy. Commit nebyl vytvořen.
- Studentka následně výslovně požádala o dokončení setupu: `prepare: husky`, `.husky/pre-commit` s `npm test` a lokální `core.hooksPath=.husky/_`. Ruční spuštění vstupního hooku přes `sh .husky/_/pre-commit` prošlo: 4 sady, 18 testů. Commit nebyl vytvořen; selhání testu v hooku nebylo samostatně simulováno.
- Vytvořen osobní `live-programming-checklist.local.md` pro přípravu na pohovor s AI. Obsahuje Husky, strukturu, exporty typů a komponent, testování a pracovní postup. Přesná cesta je v `.gitignore`; ignorování ověřeno přes `git check-ignore`. Soubor zůstává pouze lokální.

## Checkpoint 7. 11. 2026 – Tlačítko Add v EventDiscovery

- Na výslovnou žádost studentky přesunuto tlačítko Add včetně `PlusIcon` a importů z `page.tsx` do `EventDiscovery`. Odebrán prop `children` a typ `ReactNode`. Stránka zůstává Server Component.
- Skrývání tlačítka při otevřeném detailu, vzhled, responzivní velikost a cílová URL zůstávají zachované. Trvalá viditelnost tlačítka je nadále odložená.
- Testy odkazu a jeho dostupnosti přesunuty ze stránky do testů `EventDiscovery`; test skrývání používá skutečné tlačítko komponenty. Prošlo 18/18 testů, typecheck, lint a cílená kontrola formátování. Studentka následně výslovně schválila commit tohoto kroku.

## Checkpoint 7. 11. 2026 – Heroicons po review

- Na výslovnou žádost studentky nainstalován `@heroicons/react` a standardní SVG v `EventPanel.tsx` a `page.tsx` nahrazeny komponentami `XMarkIcon` a `PlusIcon` z `24/outline`.
- Zachovány velikosti `size-5` u křížku a `size-1/2` u plusu, tloušťka tahu 2 a `aria-hidden`. Vlastní marker zůstává podle review beze změny.
- Prošlo 11/11 cílených testů panelu a discovery, typecheck, cílený lint a kontrola formátování. Vizuální kontrola zbývá studentce. Studentka následně výslovně požádala o commit všech zbývajících změn včetně úpravy PR šablony.

## Checkpoint 7. 11. 2026 – Named exporty komponent

- Na žádost studentky po review sjednocen `LeafletMap` na named export přímo u deklarace. Dynamický import v `EventDiscovery` vybírá `module.LeafletMap`; test používá named import. `ssr: false` zůstává zachováno.
- `AGENTS.md` nově vyžaduje named exporty komponent přímo u deklarace. Výjimkou jsou default exporty vyžadované Next.js nebo nástroji, například routy a konfigurace.
- Po změně prošlo 18/18 testů, typecheck, lint, cílená kontrola formátování a kontrola diffu. Studentka následně výslovně schválila commit `refactor: standardize component named exports`.

## Finální kontrola Fáze 2A – 5. 11. 2026

Tento checkpoint má přednost před staršími rozpracovanými zadáními níže.

- Studentka potvrdila funkčnost aktuálního dema v prohlížeči. Implementace zúženého rozsahu 2A je hotová; návrat fokusu, Enter a všechny způsoby zavření jsou implementované.
- Mentor zkontroloval produkční komponenty, datový tok, styly a testy. Nenalezeny nepoužité lokální proměnné, parametry, nedosažitelný kód ani duplicity vyžadující refaktoring. Volitelná disabled podpora ButtonLink a alternativní logo jsou záměrně zachované; nejsou automaticky považované za mrtvý kód.
- Doplněny tři regresní testy: odpojení Escape listeneru po unmountu, použití aktuálního onClose bez starého listeneru a neobnovení výběru po novém mountu. Produkční kód se při finální kontrole neměnil.
- Ověření: 18/18 testů ve 4 sadách, lint, standardní typecheck, format check a diff check prošly. Dodatečný TypeScript průchod s noUnusedLocals, noUnusedParameters a allowUnreachableCode=false prošel nad src; generované Next validátory byly z této doplňkové kontroly vynechané, protože obsahují vlastní nepoužité deklarace. Standardní projektový typecheck je zahrnuje.
- Produkční Webpack build prošel bez chyb a varování. Standardní Turbopack build selhal při zpracování Leaflet CSS kvůli zákazu otevření portu v runneru, stejně i při požadavku na eskalované spuštění. Turbopack zůstává k lokálnímu ověření; nejde o potvrzenou chybu aplikačního kódu.
- Skutečné nativní pořadí Tabu, dlaždice a hydrataci Jest neověřuje; prohlížečové potvrzení je od studentky. Vercel preview nebylo při této kontrole ověřeno.
- Další krok: commit doplněných testů a handoffu pouze na výslovnou žádost, ověření preview a příprava názvu, celého popisu a větví PR ke schválení. PR má mít reviewera bobescz. Fáze 2A.2 začíná až po uzavření a merge 2A.

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

### Checkpoint 5. 11. 2026 – Návrat fokusu na marker

- Na výslovnou žádost studentky mentor dokončil implementaci. EventDiscovery uchovává jediný lastFocusedMarkerRef; výběr přijímá ID a HTML prvek. Zavření Escape nebo tlačítkem vrací fokus pouze na připojený marker a referenci vyčistí. Kliknutí do mapy vyčistí výběr a ref bez přesunu fokusu.
- LeafletMap sdílí activateMarker mezi kliknutím a Enterem. Target ověřuje přes instanceof LeafletMarker, HTML prvek získává přes getElement(). Enter ignoruje opakování při držení klávesy. Zbytečný preventDefault odstraněn: současný div marker nemá výchozí aktivaci Enterem. CSS callback, selectedEventId, zIndexOffset a MapClickHandler zůstaly zachované; EventPanel se neměnil.
- Ověřeno proti nainstalovanému Leafletu 1.9.4: vlastní Enter handler zůstává nutný pro div marker. Testy mapy nahrazují hranici React Leaflet a používají skutečné instance Leaflet Marker; nejde o browser test.
- Prošly všechny testy 15/15, lint, typecheck, format check a diff check. Pokryté je předání markeru kliknutím a Enterem, právě jedna aktivace bez opakování, CSS a z-index při změně výběru, fokus nadpisu a návrat na poslední marker, zavření mapou bez přesunu a odpojený marker.
- Zbývá ruční ověření výsledného toku v prohlížeči a závěrečné ověření fáze včetně buildu a preview. Commit tohoto kroku nebyl vyžádán. Nejbližší krok: Tab na marker, Enter, Escape a kontrola návratu fokusu; zopakovat s jiným markerem.

### Checkpoint 5. 11. 2026 – Pořadí prvků panelu

- Po souhlasu studentky přesunut nadpis před zavírací tlačítko v JSX EventPanel. Programový fokus nadpisu zůstává; následující Tab tak může pokračovat na zavření. Absolutní pozice tlačítka zachovává vzhled. Starší poznámky o Shift+Tab na zavření již neplatí.
- Skutečný průchod Tabem je nutné znovu ověřit v prohlížeči; Jest nenapodobuje nativní přesun fokusu klávesou Tab.

### Checkpoint 5. 11. 2026 – Obnovení původního pořadí panelu

- Na výslovnou žádost studentky vrácena poslední změna pořadí JSX: zavírací tlačítko je opět před nadpisem. Programový fokus nadpisu zůstává. Z nadpisu vede na zavření Shift+Tab; předchozí checkpoint s opačným pořadím je tímto nahrazen.
