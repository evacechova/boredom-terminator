# Fáze 3 – Seed data a lokální repository

> Režim: studentka implementuje, mentor vysvětluje rozhraní, dependency injection a práci s nedůvěryhodnými daty.

**Větev:** `03-local-repository`

**Závisí na:** sloučené Fázi 2A.2 a stejném společném dokumentačním commitu jako 2B. Implementace může běžet souběžně; závěrečná integrace a merge následují až po merge 2B.

**Výsledek:** Testovatelný repository spojující relativní seed data s platnými uživatelskými událostmi z `localStorage`.

**Specifikace:** části 7, 14 a odpovídající část 17.

## Na co se soustředíme

- Repository jako hranice mezi UI a úložištěm.
- Proč `localStorage` data nejsou důvěryhodná.
- Rozdíl mezi TypeScript typem a Zod parsováním za běhu.
- Dependency injection přes předané `Storage` a `now`.
- Testování bez skutečného prohlížeče.

## Veřejná rozhraní fáze

- `createSeedEvents(now: Date)` vrací `MapEvent[]` se stabilními ID, texty a souřadnicemi a s časy relativními k předanému `now`. Nemění předaný objekt ani nečte skrytě aktuální čas.
- `EventRepository` nabízí načtení, přidání, odstranění neplatných záznamů a reset lokálních událostí.
- Výsledek načtení vrací události, počet neplatných položek a informaci o nečitelné struktuře.

## Společný základ a hranice validace

- Zachovat `MapEvent` a osm kategorií ze `src/core/events/types.ts`, `city: "Praha"` a UTC ISO časy. Model nepřejmenovávat a nezavádět paralelní typ `Event`. Městské části jsou odložené.
- `endsAt` je volitelné; při potřebě efektivního konce použít existující `getDefaultEventEnd`. Nepřidávat druhý výpočet ani závislost na nehotových funkcích 2B. Seed časy lze odvodit přímo od `now` bez převodu místního formulářového času.
- Zod ověřuje strukturu a základní invarianty uložené události: neprázdné ID a název, schválenou kategorii, platné UTC ISO časy, konečné souřadnice v rozsahu, město a typy volitelných polí. Je-li konec zadaný, musí být pozdější než začátek. Limity textů a bezpečný HTTP(S) zdrojový odkaz sdílet s budoucím formulářem podle plánu Fáze 6.
- Historická událost je platná i po skončení. Schema pro čtení nesmí vyžadovat konec v budoucnosti. Validace nové události vůči `now` a formulářové chyby patří do Fází 6–7.
- Uložená data kontrolovat jako nedůvěryhodná. Načítání nic neopravuje ani nemaže. Sdílené časové invarianty napojit na doménu po merge 2B, pokud to bude potřeba; bez duplicitních pravidel nebo nové architektonické vrstvy.

## Ukládání, identita a zachování historie

- Seed data jsou v kódu a do `localStorage` se nikdy nezapisují. Zachovat ID `mock-1`, `mock-2`, `mock-3`. Studentka 21. 11. změnila obsah ukázek: Random play dance na Vyšehradě, natáčení coveru Cute Cats na Václavském náměstí a photocard event v PunchyCupu. První událost probíhá od hodiny před `now` do hodiny po něm. Druhá podle následného schválení začíná sedm hodin po `now` a trvá tři hodiny. Třetí začíná v 9:00 pražského kalendářního dne o tři dny později a končí o týden později opět v 9:00 pražského času. Při opakovaném generování zůstávají identity, texty a souřadnice stabilní.
- Pro nově vytvářené uživatelské události je vyhrazen formát `user:<UUID>`; vytvoření ID při převodu formuláře patří do Fáze 7. Repository nesmí přijmout ID kolidující se seed daty ani již uloženou položkou, včetně neplatné položky se stejným ID.
- Při čtení duplicitních ID má seed přednost před lokální položkou; mezi lokálními záznamy ponechat ve výsledku první platný záznam. Kolizní a další duplicitní položky přeskočit a zahrnout do hlášení neplatných položek. Zdrojové položky při čtení zůstávají beze změny.
- `add()` nesmí zapisovat výsledek `list()`: tím by uložil seed data a odstranil přeskočené položky. Načte původní lokální pole a připojí nový platný záznam při zachování všech původních položek, včetně neplatných a historických. Neprovádí update existujícího ID.
- Pokud klíč neexistuje, první zápis může vytvořit pole. Při chybě čtení, poškozeném JSON nebo kořenu jiném než pole zápis odmítnout a oznámit chybu; původní obsah nepřepisovat prázdným seznamem. Totéž platí pro selhání `setItem`.
- Historické uživatelské události se automaticky nemažou a při běžných zápisech zůstávají zachované. `removeInvalid` ponechá všechny platné záznamy včetně historie. Nečitelný kořen vyžaduje explicitní reset, nikoli pokus o automatickou opravu.
- `removeInvalid` a `resetSaved` mění pouze jediný vyhrazený klíč; nepoužívat `localStorage.clear()`. Výslovně potvrzený reset smaže i lokální historii, ale ne seed data. UI potvrzení patří do Fáze 8; nevytvářet nyní zálohování ani složitý recovery systém.

## Mentoringové kroky

1. Ověřit společný základ z 2A.2 a využít současná mock data jako základ seed dat. Tato fáze vlastní úpravy datových modulů; 2B je během souběhu nemění.
2. Vysvětlit, proč se časy seed dat odvozují od předaného `now`.
3. Napsat test aktivní, blízké a pozdější seed události.
4. Navrhnout malé `EventRepository` rozhraní a návratový typ načtení bez Reactu; zvolit jeden storage klíč a rozlišit neplatné položky, nečitelný kořen a chybu čtení.
5. Přidat Zod schema pro uložený `MapEvent` podle hranice validace výše.
6. Vytvořit jednoduchý in-memory `Storage` fake pro testy.
7. Testovat validní lokální položku vedle neplatné položky.
8. Testovat poškozený JSON, jiný kořen než pole a chybu `getItem`.
9. Implementovat načtení tak, aby seed data vždy přežila.
10. Testovat úspěšný a neúspěšný zápis, zachování původních neplatných i historických položek a odmítnutí kolize ID nebo nečitelného obsahu.
11. Přidat explicitní recovery operace a ověřit izolaci storage klíče; načtení samo nic nemaže.
12. Po merge 2B začlenit aktuální `main`, vyřešit případné kolize manifestů a dokumentace a ověřit společný výsledek. Nové časové pravidlo neimplementovat podruhé kvůli paralelní práci.

## Testy a ověření

- Seed data mají stabilní ID, texty a souřadnice a při daném `now` pokrývají aktivní, blízký a pozdější čas. Model a schema podporují všech osm schválených kategorií; není nutné přidávat osm demo událostí.
- Platná lokální událost se spojí se seed daty.
- Neplatný soused se přeskočí a nahlásí.
- Poškozený JSON nebo chyba čtení nezhodí aplikaci.
- Selhání zápisu se propaguje volajícímu.
- Historická událost projde načtením a přežije přidání další události i `removeInvalid`.
- Přidání zachová neplatné sousedy; při chybě čtení, poškozeném JSON a neplatném kořenu se `setItem` nevolá.
- Chybějící klíč dovolí první zápis. Seed data se nezapisují ani nemažou resetem.
- Duplicitní lokální ID i kolize se seed ID jsou nahlášené a nezpůsobí tiché přepsání; `add` kolizi odmítne bez zápisu.
- `removeInvalid` a `resetSaved` mění pouze vyhrazený storage klíč.
- Samostatné testy repository a po integraci testy obou fází, typecheck, lint a build projdou.

## Fáze neobsahuje

- UI warningy a potvrzovací dialogy; přijdou ve Fázi 8.
- Formulář pro zápis události; přijde ve Fázích 6–7.
- Filtry, převod pražského vstupu a editaci historie; také backend, statistiky a gamifikaci.

## Doporučený závěrečný commit

`feat: add local event repository`

## Handoff

Do části 3 v `status.md` zapsat repository kontrakt, storage klíč, zachování neplatných a historických položek, řešení ID a testovací fake. Zachovat stav 2B a evidovat začlenění jejího merge z `main`. Fáze 4 začíná až po dokončení obou proudů. Trvalé Zod nebo storage poznatky uložit do `memory/03-*.md`.
