# Boredom Terminator – stav a handoff

> Aktualizováno 22. 11. 2026. Pouze aktuální stav; historii změn uchovává Git.

## Proud 2B – `02b-event-domain`

- Worktree: `boredom-terminator`. [Plán a kontrakty funkcí](../superpowers/plans/02b-event-domain.md).
- Doména je implementovaná: převod místního času přes `@js-temporal/polyfill`, rolling filtr, pražský den, řazení a navigační URL. Převod rozlišuje chyby vstupu, pásma a obou DST situací.
- Opravy podle [PR #6](https://github.com/evacechova/boredom-terminator/pull/6): jednoduché helpery vracejí hodnotu nebo `undefined`; neplatná navigace skryje pouze odkaz. `[]` zůstává platným výsledkem datumového filtru.
- UI stále používá pevná mock data. Filtry, URL recovery a notifikace se napojí ve [Fázi 4](../superpowers/plans/04-discovery-ui.md); seed factory, runtime validace a localStorage patří Fázi 3.
- PR vede do `main`, reviewer je `BobesCZ`. PR je otevřený, není draft; opravy jsou pushnuté v `9922c10`.

## Ověření 2B

- Po úklidu duplicit: všech 53 případů v 9 sadách prošlo při `TZ=America/Los_Angeles`; prošly také typecheck, lint, cílené formátování a kontrola diffu. Panel má 8 testů; kliknutí na zavření ověřuje kontejner.
- Zachované rizikové případy: časové hranice, 23hodinový a 25hodinový pražský den, neplatné vstupy, prázdný výsledek a detail bez navigace. Řazení bylo ověřeno spustitelným příkladem včetně neměnnosti vstupu.
- Produkční `npm run build -- --webpack` prošel před úklidem testů. První běh zastavilo bezpečnostní upozornění Next.js 16.4.3; opakování uspělo. Produkční kód se při úklidu testů neměnil.
- V prohlížeči byly ověřeny navigační odkazy všech tří mock událostí. Předání do mobilní aplikace Google Maps není ručně ověřené; screenshoty a kontrola Vercel preview nejsou evidované jako hotové.

## Proud 3 – `03-local-repository`

- Samostatný worktree: `../boredom-terminator-03-local-repository`, vlastní chat. [Plán](../superpowers/plans/03-local-repository.md). Aktuální implementace zde nebyla kontrolovaná.
- Oba proudy vycházejí ze společného základu `0550180`. Nejprve se sloučí 2B do `main`, potom Fáze 3 začlení aktuální `main` a ověří integraci. Fáze 4 čeká na dokončení obou proudů.

## Další krok a otevřené úkoly

1. Na výslovný pokyn pushnout úklid testů; doplnit podklady PR #6 a pokračovat jeho review. Merge nebyl vyžádaný.
2. Před založením větve Fáze 4 na společném `main` prověřit bezpečnostní nálezy a aktualizovat Next.js i odpovídající `eslint-config-next`. Opravenou verzi znovu ověřit; aktualizace je do té doby výslovně odložená. Starší audit vývojových závislostí zůstává otevřený.
3. Vizuální hierarchie detailu, finální vztah panelu a pluska a případná šipka zpět jsou odložené. Další kandidáty evidují [budoucí nápady](../product/future-ideas.md).

## Provozní poznámky

- Turbopack build v runneru narážel na zákaz interního portu při zpracování CSS; Webpack je ověřený fallback. Standardní Turbopack build zůstává k ověření mimo toto omezení.
- Pro nové worktrees použít postup pro [generované typy Next.js](memory/01-nextjs-generated-types.md). Souběžné servery používají různé porty, například 3000 a 3001.
- [Limity CARTO](memory/02-carto-basemap-limits.md) a [PR šablona](memory/02-pr-template.md) zůstávají závazné. Vercel preview může vyžadovat přihlášení.
