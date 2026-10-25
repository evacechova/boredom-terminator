# Fáze 9 – E2E důkaz a finální nasazení

> Režim: studentka píše E2E scénáře. Mentor vysvětluje Playwright, stabilní selektory, izolaci externích služeb a deployment.

**Větev:** `09-e2e-deployment`

**Závisí na:** dokončených Fázích 1–8

**Výsledek:** Kritické scénáře projdou v desktopovém a mobilním Chromiu, produkční build je ověřený a veřejná URL obsahuje finální MVP.

**Specifikace:** části 17 a 18.

## Na co se soustředíme

- Co má ověřovat E2E test a co už patří do unit/component testu.
- Role-based selektory versus křehké CSS selektory.
- Izolace veřejných mapových dlaždic od CI testu.
- Rozdíl mezi lokálním buildem, preview deploymentem a produkcí.
- Jak číst Playwright trace a hledat skutečnou příčinu selhání.

## Mentoringové kroky

1. Přidat Playwright a pouze Chromium, pokud ještě není nainstalovaný.
2. Nastavit lokální web server a desktopový i mobilní projekt.
3. Napsat první failing discovery scénář podle rolí a viditelného textu.
4. Ověřit filtrování, marker, event panel a zavření.
5. Stabilizovat dlaždice lokálním transparentním stubem; CI nesmí záviset na veřejném tile serveru.
6. Napsat creation scénář od prázdného submitu po uloženou událost.
7. Ověřit reload: událost zůstává, panel se automaticky neotevře.
8. Spustit desktop i mobile Chromium a opravit pouze skutečné produktové vady.
9. Spustit celý unit/component suite, E2E, lint a build.
10. Aktualizovat README: instalace, spuštění, testy, build, lokální data, atribuce a veřejná URL.
11. Nasadit finální branch po explicitním potvrzení účtu a cílového prostředí.
12. Spustit smoke scénáře proti veřejné URL.
13. Zkontrolovat konzoli a hlavní routes bez lokálního serveru.

## E2E scénáře

### Discovery

- otevřít hlavní stránku,
- vidět výchozí události,
- změnit datum a městskou část,
- otevřít marker a ověřit panel,
- ověřit podmíněný source odkaz,
- zavřít panelem i klávesou.

### Create event

- otevřít `/events/new`,
- odeslat prázdný formulář a ověřit fokus první chyby,
- vyplnit platná data,
- zvolit polohu,
- uložit,
- vidět `Event added` a panel nové události,
- reloadnout a ověřit trvalou událost bez automaticky otevřeného panelu.

## Finální ověření

- Celý Jest suite má nula selhání.
- Playwright desktop i mobile Chromium mají nula selhání.
- Lint a produkční build projdou.
- README obsahuje ověřenou HTTPS URL.
- `/` a `/events/new` fungují veřejně.
- Konzole neobsahuje kritickou chybu.
- `git status` neobsahuje nezamýšlené soubory.

## Doporučený závěrečný commit

`test: verify deployed MVP flows`

## Handoff

Do `status.md` zapsat veřejnou URL, výsledky všech gate příkazů, finální commit a známé limity MVP. Odchylky a provozní poznatky z hostingu uložit do příslušných dokumentů. Dalším krokem je nový kontext a větev `10-post-mvp-planning` podle `10-post-mvp-review-and-roadmap.md`.
