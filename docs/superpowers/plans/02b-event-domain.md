# Fáze 2B – Event doména, pražský čas a filtry

> Režim: studentka implementuje, mentor vysvětluje TypeScript a TDD po malých krocích.

**Větev:** `02b-event-domain`

**Závisí na:** sloučené Fázi 2A.2 a společném dokumentačním commitu pro souběh s Fází 3

**Výsledek:** Čisté TypeScript funkce pro pražský čas, filtrování, řazení a Google Maps URL nad existujícím `MapEvent`.

**Specifikace:** části 6, 7 a 17.

## Na co se soustředíme

- Rozdíl mezi TypeScript typem a runtime validací.
- Existující union typ osmi kategorií a význam volitelných polí.
- Čisté funkce bez Reactu a browser API.
- TDD cyklus red–green–refactor.
- Rozdíl mezi pražským lokálním časem a UTC ISO.
- Injektovaný `now` místo skrytého `new Date()` uvnitř testované logiky.

## Veřejná rozhraní fáze

Použít existující `MapEvent` a `EventCategory` ze `src/core/events/types.ts`; nepřejmenovávat model ani nezavádět druhý. `location.city` zůstává `"Praha"`. Rozšíření modelu již proběhlo v 2A.2; městské části a jejich typ i filtr jsou odložené.

Existující `formatEventDate(isoDate: string): string` a `getDefaultEventEnd(startsAt: string): string` zůstávají společným základem. Nové funkce pokryjí:

- převod pražského data a času na UTC ISO,
- rolling 24hodinový filtr,
- filtr podle pražského data začátku,
- vzestupné řazení podle začátku,
- bezpečný Google Maps odkaz z přesných souřadnic.

## Časový kontrakt a paralelní hranice

- Ukládat UTC ISO řetězce. Pro nové funkce vyžadující aktuální čas používat předaný `now: Date`; neměnit předaný objekt a nečíst skrytě aktuální čas. Stejnou konvenci používá Fáze 3.
- Efektivní konec je `endsAt`, nebo při jeho absenci výsledek existujícího `getDefaultEventEnd`. Helper přičítá dvě skutečně uplynulé hodiny a očekává platný začátek; nevytvářet jeho druhou implementaci.
- Událost probíhá právě při `startsAt <= now` a efektivním konci `> now`. Konec přesně v `now` už znamená skončenou událost.
- Nadcházející událost splňuje `startsAt > now` a `startsAt <= now + 24 hodin`. Horní hranice je včetně.
- Vybraný den zahrnuje pouze `startsAt` od místní půlnoci včetně do následující místní půlnoci bez ní v `Europe/Prague`. Nejde vždy o 24 hodin. Přesah události z předchozího dne nestačí.
- Jednoduchý návrh pro DST: neexistující i dvojznačný místní vstup odmítnout s rozlišitelnou validační chybou. Nevolit tiše dřívější ani pozdější okamžik. V této fázi testovat doménový výsledek; budoucí formulář zobrazí chybu a zachová hodnoty. Výběr jedné ze dvou variant není novou UI funkcí této fáze.
- Kontrolovat neplatné vstupy před použitím časových helperů; konkrétní malé rozhraní výsledku převodu domluvit ve vstupním mentoringovém kroku. Rozhodnutí nevyžaduje změnu `MapEvent` ani neblokuje repository.
- Fáze 3 vlastní seed factory, Zod schema a storage. Neměnit jí mock data ani datové moduly. Zod do 2B nepřesouvat. Časové pravidlo potřebné oběma proudům má jedinou implementaci; případné napojení repository počká na merge 2B.

## Mentoringové kroky

1. Ověřit společný základ a neměnný model z 2A.2. Společně určit vstup a chybový výsledek převodu; nezačínat opakováním hotového modelu nebo formatteru.
2. Napsat první failing test pro letní a zimní převod pražského času.
3. Vybrat a pochopit knihovnu pro IANA časové pásmo; přidat ji až teď.
4. Implementovat minimální časové funkce a ověřit odmítnutí neexistujícího i dvojznačného času.
5. Využít existující výpočet i testy dvouhodinového konce; otestovat jeho použití při chybějícím `endsAt` ve filtru.
6. Napsat test rolling filtru podle přesných hranic výše, včetně konce přesně v `now` a začátku přesně za 24 hodin.
7. Napsat test konkrétního data: rozhoduje pouze `startsAt`; událost z předchozího dne se nezobrazí.
8. Přidat vzestupné řazení podle začátku bez změny vstupního seznamu.
9. Otestovat validní a neplatné souřadnice a přesný Google Maps odkaz.
10. Zkontrolovat názvy, duplicity a čitelnost; zachovat společný model a připravit vlastní PR před integrací Fáze 3.

## Testy a ověření

- Letní a zimní pražský čas vytvoří správné UTC hodnoty.
- Testy odmítnou pražské vstupy `2026-03-29 02:30` (neexistující) a `2026-10-25 02:30` (dvojznačný).
- Pražské dny změny času mají správné hranice i při délce 23 nebo 25 hodin.
- Rolling filtr zahrne aktivní a blízké události, ne pozdější.
- Datum 30. října zahrne jen události začínající 30. října.
- Probíhající událost bez `endsAt` používá společný helper; skončená událost neprojde výchozím filtrem.
- Horní hranice rolling okna je včetně; další okamžik už neprojde. Řazení nemění vstupní seznam.
- Neplatné datum, čas a souřadnice mají explicitní chybový výsledek místo zavádějícího platného výstupu.
- Google Maps URL používá zakódované souřadnice.
- Cílené testy, lint a build projdou.

## Návaznost na demo

Společný formatter už existuje a karta jej používá; nevytvářet jej podruhé. Nové filtrační funkce zatím testovat samostatně; ovládání filtrů přidává Fáze 4. Výchozí filtr skryje skončené události, ale nemaže je. Filtr zvoleného dne může zahrnout historii podle `startsAt`. Žádná funkce této fáze není podmínkou pro již dokončené demo.

## Fáze neobsahuje

- Zod schema uložených dat.
- React komponenty.
- `localStorage`.
- Městské části, editaci historie, formulářovou validaci ani změnu společného modelu.

## Doporučený závěrečný commit

`feat: add event domain rules`

## Handoff

Do části 2B v `status.md` zapsat veřejné funkce, časovou knihovnu, chybový kontrakt a ověřené DST případy. Zachovat samostatný stav Fáze 3. Po merge 2B je jejím dalším krokem začlenění aktuálního `main` a integrační ověření. Nové trvalé TypeScript poznatky uložit do `memory/02-*.md`.
