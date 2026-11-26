# Stav a handoff

> Aktualizováno 26. 11. 2026. Aktuální větev: `chore/documentation-and-ui-cleanup`; základ `a54c795`.

## Co je hotové

- Fáze 1–3 jsou sloučené, včetně PR #6 (2B) a #5 (3). Mapa má detail, navigaci a relativní seedy; časová doména je hotová, filtry nejsou napojené do UI.
- REST API, databázové připojení a formulář zatím nejsou implementované. Nový rozsah určuje [MVP](mvp.md), pořadí [roadmapa](roadmap.md).

## Mentoringový kontext

- ORM, REST a rozdíl oproti Server Actions byly vysvětlené v chatu; v projektu je zatím prakticky nepoužíváme. U prvního GET začít konkrétním tokem požadavek → serverová obsluha → databáze → odpověď, bez předpokladu samostatného zvládnutí po jednom vysvětlení.

## Rozpracováno a ověření

- Úklid testů zahrnuje odstranění `src/app/page.test.tsx` a zjednodušení `EventMapContainer.test.tsx`; původní změny jsou zachované ve větvi úklidu.
- Dokumentace, PR šablona a mentoringová pravidla jsou sjednocené; pravidla zápisu a práce s PR určuje `AGENTS.md`. Nálezy auditu jsou zapracované, včetně schválených dynamických ukázek oddělených od databáze. Původní změny testů jsou zachované.
- Schválený úklid kódu je hotový: Next.js a `eslint-config-next` 16.4.6, odstraněný Geist Mono, nepoužívaná varianta `ButtonLink.disabled` a zastaralé TODO. UI je anglicky, formát data `en-GB` zachovává `Europe/Prague`; existující testy mají aktualizované texty.
- Prošlo 43 testů v 8 sadách při `TZ=America/Los_Angeles`, lint, typecheck, formátování a produkční Turbopack build mimo sandbox. Nezávislé review bez nálezů. `npm audit --omit=dev` hlásí 0 nálezů; celkový audit stále 24 středně závažných nálezů ve vývojových závislostech.
- Lokální produkční build ověřen v desktopovém i mobilním prohlížeči: anglický detail, navigační odkaz, Enter, Escape, zavření tlačítkem, návrat fokusu a odstranění Mono fontu. Dlaždice CARTO vracejí 403; studentka potvrdila, že podklad nyní očekávaně nefunguje, proto se neřeší. Nasazení na Vercelu se neměnilo.

## Otevřené a další krok

1. Dokončit draft PR větve úklidu do `main`, projít review a nechat studentku sloučit přes Squash and merge. Název a celý popis PR musí před vytvořením schválit studentka podle `AGENTS.md`.
2. Samostatně prověřit zbývající nálezy vývojových závislostí a zvolit cílené opravy.
3. Zahájit [Fázi 4](04-database-api.md) na `04-database-api`: nejprve vysvětlit PostgreSQL a vybrat databázový klient/ORM. Neon účet, region a přiřazení databází k Vercel prostředím ještě nebyly kontrolované ani nastavované.

Pro čistý worktree platí [generování Next.js typů](../README.md#checks); mapový podklad má vlastní [provozní poznámku](../README.md#map-configuration). Předání navigace do mobilní Google Maps aplikace zůstává ručně neověřené.
