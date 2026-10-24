# Boredom Terminator – vstupy pro vývoj po MVP

> Stav: neschválené kandidátní nápady. Tento dokument není specifikace ani implementační plán.
>
> Fáze 10 každý bod porovná se skutečným MVP, doplní potřebný výzkum a rozhodne o jeho dalším stavu.

## Směr produktu

- Zachovat mapově orientované, mobile-first objevování menších komunitních akcí.
- Zvážit rozšíření z pražského K-popu na další komunity, žánry, typy akcí a města.
- Nepředstírat ověřené, sdílené nebo moderované informace dřív, než pro ně existuje skutečný backend a proces.
- Organizovat texty tak, aby šlo později přidat češtinu bez přepisování komponent.

## Sdílený backend a databáze

Backend začne dávat smysl, až mají různí uživatelé vidět stejné vytvořené události nebo přibude identita, fotografie, moderace či potvrzování akcí.

Před volbou řešení:

- ověřit aktuální možnosti a limity hostingu,
- porovnat Supabase s Next.js serverovou vrstvou a dalšími hostovanými PostgreSQL variantami,
- posoudit PostgreSQL/PostGIS, autentizaci, storage, realtime, migrace a lokální vývoj,
- porovnat region dat, latenci, cenu, bezplatné limity a vendor lock-in,
- navrhnout migraci z `localStorage` bez zbytečného přepisu UI,
- zachovat možnost ukládat souřadnice mimo Prahu; omezení oblasti má být aplikační nebo konfigurační pravidlo.

Prostředí musí zůstat oddělená. Lokální vývoj ani preview nesmí zapisovat do produkční databáze. Před implementací se rozhodne, zda preview používá společnou neprodukční databázi, nebo izolované databázové větve.

## Identita a soukromí

Přihlášení se má řešit společně s backendem a oprávněními. Před návrhem:

- upřesnit cílové věkové rozpětí,
- zjistit obvyklé způsoby přihlášení cílové skupiny,
- porovnat Google, Apple, e-mailový magic link a další jednoduché varianty,
- ověřit aktuální věkové podmínky poskytovatelů a pravidla rodičovského souhlasu,
- posoudit ochranu soukromí nezletilých a minimalizaci osobních dat pro české a evropské uživatele.

## Fotografie a podklady události

- Umožnit fotografii nebo screenshot akce.
- Vyřešit storage, kompresi, dostupnost a moderaci obsahu.
- Pro veřejně přidanou akci zvážit povinnou fotografii, screenshot nebo zdrojový odkaz.
- Nenavrhovat upload izolovaně od identity, oprávnění a abuse prevention.

## Důvěryhodnost a životní cyklus události

- Umožnit uživatelům potvrdit, že se akce koná nebo stále probíhá.
- Navrhnout pravidla platnosti potvrzení, vizuální stav a ochranu proti zneužití.
- U akce bez známého konce zvážit pozdější výzvu autorovi k potvrzení pokračování.
- Teprve v další fázi zvážit potvrzení jiným uživatelem než autorem.
- Přidat detekci duplicit a reputaci autorů pouze s jasným modelem identity a důvěry.

## Moderace a správa

- Porovnat validační pravidla, uživatelské nahlašování, administrátorskou kontrolu a případnou AI asistenci.
- AI nesmí být povinným předpokladem architektury.
- Navrhnout nahlášení, administraci, audit změn a pravidla odstraňování obsahu.
- Vyřešit abuse prevention před komentáři, potvrzováním nebo veřejným uploadem.

## Bohatší obsah a sociální funkce

- Plná detailní stránka události až pro bohatší data.
- Komentáře, aktualizace a zpětná vazba až po vyřešení identity a moderace.
- Fotogalerie minulých akcí.
- Hledání lidí, se kterými lze na akci jít.
- Sdílení oblíbené hudby a hledání podobně zaměřených lidí.

## Vyhledávání, kategorie a geografické rozšíření

- Filtrování podle podkategorie.
- Další typy K-pop akcí, například trading nebo fan setkání.
- Jednoduchý návrh kategorie podle klíčových slov bez povinné AI; uživatel jej musí moci změnit.
- Výběr města po rozšíření mimo Prahu.
- Reverzní geokódování pro návrh města a městské části ze souřadnic.
- Vlastní emoji nebo ilustrované markery jednotlivých kategorií.

## Komfort formuláře

- Automaticky ukládat samostatný neúplný draft po opuštění pole nebo krátké prodlevě.
- Draft po návratu obnovit.
- Nabídnout `Discard draft`.
- Draft po úspěšném vytvoření události smazat.
- Vyřešit chování při změně schématu formuláře a po přihlášení na jiném zařízení.

## Instalace, notifikace a offline režim

- Instalovatelná PWA.
- Push notifikace.
- Případný offline režim.
- Tyto oblasti navrhovat samostatně; každá má jiné požadavky na oprávnění, cache, synchronizaci a aktualizace.

## Zpracování ve Fázi 10

Každý bod dostane jeden stav:

- `candidate`,
- `needs discovery`,
- `ready for spec`,
- `rejected`,
- `done`.

Teprve položka se schválenou specifikací smí dostat implementační plán.
