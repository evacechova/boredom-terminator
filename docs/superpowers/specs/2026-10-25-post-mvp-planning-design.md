# Post-MVP review a navazující plánování – návrh

> Stav: schválený směr 25. 10. 2026

## Záměr

Po dokončení MVP vznikne samostatná plánovací fáze. Nejdřív provede komplexní review skutečného kódu a výsledného produktu. Teprve potom porovná zjištění s archivovanými produktovými poznámkami a navrhne další práci.

Cílem není automaticky převést každý starý nápad na úkol. Cílem je vytvořit podloženou roadmapu a implementační plány pouze pro dostatečně rozhodnuté funkce.

## Cíle

- Ověřit stav MVP proti specifikaci, testům a veřejnému nasazení.
- Zmapovat architekturu, kvalitu kódu, technický dluh, rizika a rozhodnutí, která stojí za zachování.
- Prověřit budoucí nápady z `docs/product/future-ideas.md` proti zkušenostem z implementace.
- Rozdělit budoucí práci podle hodnoty, rizika, závislostí a připravenosti.
- Vytvořit aktivní post-MVP roadmapu.
- Připravit samostatné specifikace a implementační plány pro další smysluplné celky.

## Ne-cíle

- Neimplementovat nové produktové funkce.
- Neměnit kód pouze kvůli osobní stylistické preferenci reviewera.
- Nevybírat backend, databázi nebo autentizaci bez aktuálního výzkumu.
- Nevytvářet falešně přesné implementační plány pro nerozhodnuté nápady.
- Nezacházet s kandidátními nápady jako s automaticky schválenými požadavky.

## Zvažované přístupy

### Přidat plánování do Fáze 9

Výhoda: méně dokumentů. Nevýhoda: dokončení a nasazení MVP by se smíchalo s rozsáhlým review další verze. Fáze by neměla čistou podmínku dokončení.

### Napsat budoucí roadmapu před implementací MVP

Výhoda: nápady by byly seřazené dřív. Nevýhoda: roadmapa by nevycházela ze skutečného kódu, testů, uživatelských toků ani zkušeností s deploymentem.

### Samostatná Fáze 10

Vybraný přístup. Fáze 9 uzavře a doloží MVP. Fáze 10 začne ze stabilního commitu, provede review a vytvoří navazující specifikace a plány bez implementace funkcí.

## Výstupy

- datovaný report komplexního review,
- aktivní `docs/product/future-development.md`,
- mapa závislostí a pořadí navazujících celků,
- discovery nebo research úkoly pro nerozhodnuté oblasti,
- samostatné schválené specifikace pro připravené oblasti,
- samostatné implementační plány a navržené větve,
- aktualizovaný handoff, deviations a relevantní memory.

## Pravidla rozhodování

- Každé zjištění musí mít konkrétní důkaz v kódu, testu, běhu aplikace nebo dokumentaci.
- Každý budoucí nápad dostane stav: `candidate`, `needs discovery`, `ready for spec`, `rejected` nebo `done`.
- Priorita sama nestačí. Položka musí uvádět hodnotu, závislosti, hlavní riziko a další rozhodnutí.
- Větší nezávislé subsystémy dostanou vlastní specifikaci a vlastní implementační plán.
- Pokud review odhalí regresi nebo nesplněnou podmínku MVP, vznikne nejprve opravný plán. Nesmí se tiše přimíchat do nové funkce.
- Informace závislé na aktuálních službách, cenách, pravidlech nebo knihovnách se znovu ověří v době Fáze 10.

## Podmínka dokončení

Fáze končí až tehdy, když lze z aktivní roadmapy poznat:

- co má přijít dál a proč,
- co ještě potřebuje produktové rozhodnutí nebo výzkum,
- které plány jsou připravené k implementaci,
- v jakém pořadí mají vzniknout větve,
- která zjištění z MVP musí další vývoj zachovat nebo opravit.
