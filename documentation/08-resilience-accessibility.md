# Fáze 8 – Chybové stavy a přístupnost

**Větev:** `08-resilience-accessibility`. **Závisí na:** funkčním čtení a vytváření z Fází 4–7.

**Výsledek:** Selhání API, databáze, dlaždic nebo GPS neztratí vyplněná data a má srozumitelný další krok. Hlavní toky fungují klávesnicí.

**Specifikace:** [MVP](mvp.md), část Selhání a přístupnost.

## Kroky

1. Projít existující stavy GET, POST a GPS. Doplnit pouze chybějící přechody a rozdíl mezi chybou a prázdným výsledkem; nezavádět globální error framework.
2. Zachovat již načtené události při neúspěšném obnovení. Nabídnout retry GET a serverové podrobnosti nechat mimo veřejnou odpověď.
3. Zachytit `tileerror`, zobrazit textový seznam se stejnými filtry a odkazy. `Try again` znovu načte vrstvu; fallback zmizí po úspěšném `tileload`.
4. Dokončit výpadek dlaždic ve formuláři, zachování hodnot a GPS alternativu. Na prázdném podkladu se poloha nevybírá.
5. Projít markery, detail, filtry, formulář a chyby pouze klávesnicí. Ověřit fokus po filtrování a zavírání i přístupné zprávy `status`/`alert`.
6. Zkontrolovat popisky, propojení chyb, kontrast a významy nezávislé na barvě. Upravit pouze nalezené nedostatky.

## Ověření a konec

- Testy chrání dosud nepokryté integrační přechody API failure/retry a tile failure/loading/success. Neopakovat SQL, DST ani validační sady.
- Fallback zachová filtr, řazení a zdrojové i navigační odkazy. Formulář neztratí data ani při souběhu výpadku mapy a GPS.
- Klávesnicový průchod projde včetně návratu fokusu na dostupný marker; známé limity se zapíšou do statusu.
- Celý Jest suite, lint, typecheck a build projdou. Plný automatizovaný WCAG audit ani nové produktové funkce do fáze nepatří.
