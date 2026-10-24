# Fáze 10 – Post-MVP review a navazující roadmapa

> Režim: studentka se účastní review a rozhoduje o prioritách. Mentor vede systematickou kontrolu, vysvětluje nálezy a nepřevádí neurčité nápady rovnou na implementaci.

**Větev:** `phase/10-post-mvp-planning`

**Závisí na:** dokončené a veřejně ověřené Fázi 9

**Výsledek:** Komplexní review skutečného MVP, aktivní post-MVP roadmapa a samostatné specifikace a implementační plány pro další připravené celky. Fáze neobsahuje implementaci nových funkcí.

**Specifikace:** `docs/superpowers/specs/2026-10-25-post-mvp-planning-design.md`

## Na co se soustředíme

- Rozdíl mezi review nálezem, produktovým nápadem, discovery úkolem a implementačním plánem.
- Hodnocení skutečného kódu a chování místo původních předpokladů.
- Rozpoznání technického dluhu, který představuje riziko, od pouhé stylistické preference.
- Závislosti mezi backendem, identitou, fotografiemi, moderací a víceuživatelskými funkcemi.
- Prioritizace podle hodnoty, rizika a potřebného učení.
- Rozdělení budoucí práce na samostatně testovatelné větve.

## Vstupy

- finální kód a veřejné nasazení MVP,
- `docs/superpowers/specs/2026-10-24-mvp-design.md`,
- plány Fází 1–9 a jejich handoffy,
- `docs/mentoring/status.md`, `deviations.md` a relevantní memory,
- `docs/product/future-ideas.md` jako zdroj kandidátních nápadů, ne autorita,
- README, testy, dependency manifesty a deployment konfigurace,
- skutečné problémy nebo zpětná vazba zaznamenaná během vývoje.

## Úkol 1 – Zafixovat ověřený výchozí stav

1. Zapsat commit, veřejnou URL, runtime a verze hlavních závislostí.
2. Spustit úplné unit, component a E2E testy, lint a produkční build.
3. Ověřit hlavní scénáře proti veřejnému deploymentu.
4. Zapsat selhání bez jejich opravování v této fázi.
5. Rozlišit regresi MVP od budoucího vylepšení.

**Výstup:** reprodukovatelný baseline v reportu review.

## Úkol 2 – Zmapovat architekturu a hlavní toky

1. Projít strukturu repozitáře a odpovědnosti modulů; pokud je dostupný použitelný CodeGraph index, začít jím.
2. Vysledovat tok discovery: repository, doména, filtry, mapa a panel.
3. Vysledovat tok vytvoření: formulář, validace, poloha, normalizace, zápis a návrat.
4. Zmapovat hranice Server Components, Client Components a browser API.
5. Zapsat veřejná rozhraní a místa, kde jsou vrstvy nežádoucím způsobem propojené.

**Výstup:** stručná mapa architektury a datových toků v reportu.

## Úkol 3 – Provést komplexní review kódu a produktu

Review pokryje minimálně:

- shodu s MVP specifikací a známými odchylkami,
- doménová pravidla, časová pásma a hraniční hodnoty,
- runtime validaci, `localStorage` a obnovu poškozených dat,
- React state, Next.js hranice, hydrataci a navigaci,
- Leaflet, GPS, externí odkazy a selhání dlaždic,
- formulář, zachování hodnot a chybové scénáře,
- přístupnost, klávesnici, fokus, mobile a desktop chování,
- bezpečnost, soukromí a zacházení s nedůvěryhodným obsahem,
- výkon, velikost klientského JavaScriptu a zbytečné renderování,
- testovací mezery, křehké testy a závislost na externích službách,
- deployment, konfiguraci, logování chyb a provozní omezení,
- čitelnost, duplicity, mrtvý kód a dokumentaci.

Každý nález uvede závažnost, konkrétní důkaz, dopad, doporučenou reakci a cílový budoucí celek. Report zaznamená také rozhodnutí a části návrhu, které je vhodné zachovat.

**Výstup:** `docs/reviews/YYYY-MM-DD-post-mvp-review.md`.

## Úkol 4 – Revidovat budoucí produktové nápady

1. Projít každý post-MVP nápad v `docs/product/future-ideas.md`.
2. Sloučit duplicity a označit zastaralé nebo konfliktní položky.
3. Porovnat nápady s review, deviations, memory a zkušeností z hotového MVP.
4. Každé položce přiřadit stav `candidate`, `needs discovery`, `ready for spec`, `rejected` nebo `done`.
5. U každé ponechané položky zapsat hodnotu pro uživatele, závislosti, hlavní riziko a chybějící rozhodnutí.
6. Neověřené předpoklady nepřepisovat jako požadavky.

**Výstup:** rozhodovací tabulka jako podklad aktivní roadmapy.

## Úkol 5 – Vytvořit aktivní post-MVP roadmapu

Vytvořit `docs/product/future-development.md`, který obsahuje:

- potvrzený směr produktu po MVP,
- nálezy MVP ovlivňující další architekturu,
- kandidátní funkce a jejich stav,
- závislosti a doporučené pořadí,
- samostatný research backlog,
- zamítnuté nebo odložené položky s důvodem,
- odkazy na vzniklé specifikace a implementační plány.

Roadmapa nesmí slibovat termíny ani konkrétní služby bez podkladů. `future-ideas.md` zůstane vstupním backlogem, ne závazným plánem.

## Úkol 6 – Vybrat navazující celky

1. Nejprve oddělit případné opravy nesplněného MVP.
2. Seskupit připravené položky podle společného uživatelského výsledku, ne podle technické vrstvy.
3. Vytvořit mapu závislostí mezi celky.
4. Navrhnout pořadí, ve kterém každý celek vytvoří samostatně ověřitelný výsledek.
5. Se studentkou potvrdit, které celky postoupí do specifikace.

Backend, databáze, autentizace, fotografie a moderace se nesmí automaticky sloučit do jednoho plánu jen proto, že spolu souvisejí.

## Úkol 7 – Doplnit chybějící discovery a aktuální výzkum

1. Pro každý stav `needs discovery` formulovat konkrétní otázky a rozhodovací kritéria.
2. U služeb, cen, právních pravidel, podpory knihoven a hostingu použít aktuální primární zdroje.
3. U víceuživatelských funkcí vyjasnit identitu, oprávnění, soukromí, abuse prevention a vlastnictví dat.
4. Výzkum oddělit od implementačních kroků.
5. Pokud chybí produktové rozhodnutí, zastavit daný celek před tvorbou implementačního plánu.

**Výstup:** samostatné research/discovery úkoly nebo podklady pro specifikaci.

## Úkol 8 – Vytvořit specifikace připravených celků

1. Každý větší nezávislý celek projít samostatným brainstormingem.
2. Popsat cíle, ne-cíle, scénáře, chybové stavy, datové dopady a akceptační podmínky.
3. Zaznamenat zvažované přístupy a potvrzenou volbu.
4. Nechat specifikaci schválit před tvorbou implementačního plánu.
5. Uložit ji jako samostatný datovaný soubor v `docs/superpowers/specs/`.

## Úkol 9 – Vytvořit další implementační plány

1. Pro každou schválenou specifikaci použít `superpowers:writing-plans`.
2. Větší nezávislé subsystémy rozdělit do samostatných plánů.
3. Každému plánu určit vlastní větev, závislosti, testovatelný výsledek a stop condition.
4. Zahrnout testy, dokumentaci, migrace a rollback tam, kde je vyžaduje riziko změny.
5. Neplánovat těla funkcí nebo konkrétní kód za studentku; zachovat learner-led režim.
6. Přidat nové plány do roadmapy v doporučeném pořadí.

**Výstup:** další sada implementačních plánů připravených pro nové kontexty a větve.

## Úkol 10 – Závěrečná kontrola plánovací sady

1. Ověřit, že každý závažný review nález má opravu, vědomé přijetí rizika nebo odklad s důvodem.
2. Ověřit, že každý aktivní roadmapový celek odkazuje na discovery, specifikaci nebo plán podle svého stavu.
3. Ověřit, že mezi plány nejsou skryté kruhové závislosti ani duplicitní práce.
4. Zkontrolovat, že žádný plán nevydává nerozhodnutý nápad za schválenou funkci.
5. Aktualizovat `status.md`, deviations a relevantní memory.
6. Zkontrolovat diff a uzavřít fázi commitem.

## Testy a ověření

- Baseline příkazy a jejich výsledky jsou reprodukovatelně zapsané.
- Report obsahuje důkazy a odkazy na konkrétní kód nebo chování.
- Každý nápad z product notes má dohledatelnou dispozici.
- Každá roadmapová položka má stav, hodnotu, závislosti, riziko a další krok.
- Každý připravený implementační plán odkazuje na schválenou specifikaci.
- Regrese MVP jsou oddělené od nových funkcí.
- Nové plány mají samostatné větve a smysluplné pořadí.
- Fáze nepřidala žádnou novou produktovou funkcionalitu.

## Fáze neobsahuje

- Implementaci výstupů nových plánů.
- Automatický výběr backendu nebo databáze.
- Přepis kandidátních nápadů na závazné požadavky bez schválené specifikace.
- Refaktoring nebo opravy nalezených problémů bez samostatného plánu.

## Doporučený závěrečný commit

`docs: plan post-MVP development`

Commit provede mentor pouze na výslovnou žádost.

## Handoff

Do `status.md` zapsat review report, stav veřejného MVP, aktivní roadmapu, schválené specifikace, pořadí nových plánů, první větev další práce a všechny přijaté nebo odložené závažné nálezy.
