# Fáze 4 – Discovery stav, filtry a textový seznam

> Režim: studentka implementuje. Mentor propojí známý React se server/client hranicí Next.js.

**Větev:** `phase/04-discovery-ui`

**Závisí na:** repository z Fáze 3

**Výsledek:** Hlavní route načte události na klientovi, spravuje filtry a výběr události a umí vykreslit přístupný textový seznam bez Leafletu.

**Specifikace:** části 7, 8, 14 a 15 bez mapové implementace.

## Na co se soustředíme

- Proč stránka může být Server Component, ale `localStorage` potřebuje Client Component.
- Jak zabránit čtení browser API během server renderu.
- Lokální React state bez Reduxu.
- Odvozený stav místo duplicitního ukládání filtrovaných dat.
- Rozdělení controller hooku a prezentačních komponent.

## Veřejná rozhraní fáze

- `useEventDiscovery` drží načtené události, filtry, `selectedEventId` a výsledek načtení.
- `EventFilters` nabízí rolling režim, konkrétní datum a volitelnou městskou část.
- `EventList` zobrazuje seřazené události a později poslouží jako mapový fallback.

## Mentoringové kroky

1. Nakreslit tok dat od repository přes controller hook do komponent.
2. Rozhodnout, co je zdrojový stav a co lze dopočítat.
3. Napsat failing test výchozího rolling výsledku.
4. Přidat test, že konkrétní datum nahradí rolling filtr.
5. Přidat test městské části a resetu filtrů.
6. Implementovat controller hook bez mapových detailů.
7. Vytvořit přístupné formulářové prvky filtrů.
8. Přidat textový seznam a prázdný stav.
9. Ověřit, že server render nesahá na `window.localStorage`.
10. Zkontrolovat, že podkategorie se zobrazuje, ale není filtrem.

## Testy a ověření

- Výchozí rolling filtr ukáže očekávané události.
- Datum a městská část mění výsledek.
- `Reset filters` obnoví výchozí režim.
- Prázdný výsledek zobrazí správnou zprávu a `Add event`.
- Test zachytí případné čtení `localStorage` při server renderu.
- Cílené testy, lint a build projdou.

## Fáze neobsahuje

- Leaflet mapu, markery, GPS ani panel.
- Recovery akce pro poškozená data.

## Doporučený závěrečný commit

`feat: add event discovery state`

## Handoff

Do `status.md` zapsat tvar discovery stavu, client boundary, hotové filtry a první krok Fáze 5. Důležité Next.js hydration poznatky uložit do `memory/04-*.md`.
