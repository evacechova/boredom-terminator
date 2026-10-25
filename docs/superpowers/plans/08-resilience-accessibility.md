# Fáze 8 – Recovery stavy a přístupnost

> Režim: studentka implementuje. Mentor vysvětluje chybové modely, bezpečné destruktivní akce a přístupnost v kontextu existujícího UI.

**Větev:** `08-resilience-accessibility`

**Závisí na:** funkčních hlavních scénářích z Fází 4–7

**Výsledek:** Aplikace zůstane použitelná při poškozených datech, selhání mapových dlaždic, GPS chybách a prázdném výsledku; klíčové scénáře fungují klávesnicí a čtečkou obrazovky.

**Specifikace:** části 14 a 15.

## Na co se soustředíme

- Rozdíl mezi blokující chybou, neblokujícím warningem a prázdným stavem.
- Recovery akce, které nic nemažou bez potvrzení.
- `role="status"`, `role="alert"`, focus management a přístupné názvy.
- Proč textový fallback není druhý trvalý layout.
- Testování chybových cest, které happy-path testy neodhalí.

## Mentoringové kroky

1. Sepsat stavový diagram pro načtení dat, dlaždice, GPS a formulář.
2. Napsat failing test neblokujícího varování pro některé neplatné položky.
3. Přidat potvrzovanou akci `Remove invalid data`.
4. Napsat test nečitelného kořene a potvrzovaného `Reset saved events`.
5. Ověřit, že žádná recovery akce neběží bez potvrzení.
6. Zachytit první `tileerror` jako MVP selhání a zobrazit `Map couldn't load`.
7. Vykreslit seřazený textový seznam s funkčními source a Google Maps odkazy.
8. `Try again` remountne vrstvu; fallback zmizí až po `tileload`.
9. Dokončit empty state a reset filtrů.
10. Projít aplikaci pouze klávesnicí a zapsat problémy.
11. Doplnit fokus panelu, návrat fokusu, `Escape`, labely a programově propojené chyby.
12. Zkontrolovat kontrast, visible focus a místa, kde barva nese význam sama.
13. Přidat automatické component testy pro stabilní přístupnostní kontrakty.

## Testy a ověření

- Platná data a seed data přežijí neplatné sousedy.
- Recovery akce mají potvrzení a omezený storage klíč.
- Tile fallback respektuje aktuální filtry a řazení.
- Retry má ověřený přechod failure → loading → map.
- Statusy a alerty používají správné role.
- Markery, panel, filtry, formulář a recovery akce lze použít klávesnicí.
- Fokus se po zavření panelu vrací na původní marker.
- Celý Jest suite, lint a build projdou.

## Fáze neobsahuje

- Nové produktové funkce.
- Automatizovaný plný WCAG audit.
- Trvalý kombinovaný mapový a seznamový pohled.

## Doporučený závěrečný commit

`feat: add resilient accessible states`

## Handoff

Do `status.md` zapsat všechny recovery stavy, výsledky keyboard průchodu, zbývající známé limity a první krok Fáze 9. Opakovaně použitelné accessibility nebo Leaflet poznatky uložit do `memory/08-*.md`.
