# Fáze 4 – Databáze a první REST endpoint

**Větev:** `04-database-api`. **Závisí na:** uzavřeném úklidu na `main`, Fázích 2B a 3.

**Výsledek:** Mapa přes vlastní `GET /api/events` načítá uložené události z PostgreSQL na Neonu a oddělené dynamické ukázky. Zápis přijde s formulářem ve Fázi 7.

**Specifikace:** [MVP](mvp.md), zejména REST, databáze a uchování historie. Mentoring a rozsah testů řídí [AGENTS.md](../AGENTS.md).

## Soubory a odpovědnosti

- Migrace schématu: formát a umístění souborů určit až podle zvoleného databázového klienta nebo ORM.
- `src/data/db.ts`: serverové připojení, bez zveřejnění přihlašovacích údajů.
- `src/data/events.ts`: parametrizované databázové operace a převod řádků na `MapEvent`; bez HTTP a Reactu.
- `src/app/api/events/route.ts`: GET vrací uložené `events` a zvlášť `demoEvents` z existující factory; bez zápisu ukázek do databáze.
- `src/app/page.tsx` a existující `EventMapContainer`: načtení přes API místo přímého předání seedů; zachovat mapu, detail a fokus.

## Kroky

1. Vysvětlit tabulku, řádek, primární klíč, SQL dotaz, migraci a rozdíl od TypeScript typu. Nakreslit tok prohlížeč → GET → datová operace → PostgreSQL → JSON.
2. Vybrat databázový klient nebo ORM podle jednoduchého SELECTu, parametrizace a spouštění migrací. Nezavádět obecný repository interface ani přihlašování. Volbu, důvod a odpovídající podobu migrací doplnit do tohoto plánu.
3. Připravit Neon a oddělená vývojová, preview a produkční data. Ověřit přiřazení prostředí; automatické preview větve nejsou totéž co sdílená produkce.
4. Navrhnout tabulku podle `MapEvent`: unikátní ID, povolené kategorie, limity textů a souřadnic, časové sloupce `timestamptz` a konec po začátku. Omezení vytváření „konec v budoucnosti“ nepatří do trvalého CHECKu, protože historie zůstává platná.
5. Přidat opakovatelný příkaz `npm run db:migrate`. Databázové testy používají vlastní izolované záznamy; dynamické demo zůstává v existující factory a nepotřebuje databázový seed.
6. Implementovat `listEvents(): Promise<MapEvent[]>` pro uložené události a GET s tvarem a chybami ze specifikace. Předat factory aktuální `now`; DB časy převést na UTC ISO a souřadnice na čísla podle zvoleného klienta. Chybu databáze nezakrývat samotnými ukázkami.
7. Připojit GET přes klientský `fetch`, zkontrolovat HTTP status a rozlišit načítání, prázdný výsledek a chybu s retry. Pro mapu spojit oba seznamy, zachovat rozlišení ukázek a filtrovat stávajícími helpery. Před případným novým React celkem studentka určí server/client hranici.
8. Na dvou prohlížečích ověřit stejné uložené události a aktuální ukázky. Zapsat migrace, chování ukázek a proměnné prostředí do README; žádné skutečné přístupové údaje do Gitu.

## Ověření a konec

- Migrace fungují na oddělené testovací databázi. Prázdná databáze nezabrání zobrazení ukázek; GET nevkládá ani nemění databázové záznamy.
- Integračně ověřit skutečný GET: oba seznamy, UTC časy, zachování historie a aktuální ukázky bez posunu uložených událostí. Neopakovat filtrační a DST testy z 2B.
- Chyba databáze vrátí řízenou HTTP chybu; UI ji nezamění za prázdný seznam. Síťový test nepřistupuje k produkčním datům.
- Existující testy, lint, formátování, typecheck a build projdou. Preview má správnou databázi a mapa zachová výběr i detail.
