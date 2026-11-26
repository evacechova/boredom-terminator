# Fáze 9 – Ověření veřejného MVP

**Větev:** `09-e2e-deployment`. **Závisí na:** dokončených Fázích 4–8.

**Výsledek:** Desktopový a mobilní průchod prokáže REST, databázové uložení a použitelnost veřejného MVP.

**Specifikace:** [MVP](mvp.md), část Hotové MVP.

## Kroky

1. Přidat Playwright Chromium pro desktop a mobil. Testy používají oddělenou databázi s deterministickými daty; veřejné dlaždice nahradit lokálním stubem, vlastní REST API ponechat skutečné.
2. Ověřit discovery: výchozí filtr, konkrétní datum a reset, marker, správný detail a zavření.
3. Ověřit vytvoření: neplatný submit, oprava, poloha, POST, potvrzení a návrat na mapu. Reload i nový browser context načtou uloženou událost; panel se sám neobnoví a původní historie zůstane v databázi.
4. Spustit unit/component testy, E2E, lint, formátování, typecheck a produkční build. Neduplikovat všechny chybové a DST případy do E2E.
5. Doplnit README o instalaci, proměnné bez tajných hodnot, migrace, chování ukázek, testy a veřejnou URL. Zkontrolovat oddělení databází a atribuci mapy.
6. Ověřit nasazení na určeném Vercel projektu. Veřejný smoke průchod kontroluje čtení, navigaci a dostupnost `/` a `/events/new`; automatické zápisové testy neběží proti produkčním datům.

## Konec MVP

- Všechny zvolené kontroly projdou, hlavní scénáře jsou použitelné na mobilu i desktopu a konzole nemá kritickou chybu.
- Událost přežije reload a je dostupná jinému návštěvníkovi. Nezůstane nesplněná podmínka MVP schovaná mezi bonusy.
- Status obsahuje ověřený commit, veřejnou URL, výsledky a případné známé limity. Následuje volitelná [Fáze 10](10-bonus.md).
