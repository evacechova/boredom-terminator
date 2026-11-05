# Fáze 2A.2 – Dokončení karty a mapového UI

**Větev:** `02a2-event-map-ui`

**Závisí na:** ověřené, commitnuté a sloučené Fázi 2A. Předchází Fázi 2B.

## Cíl a rozsah

Studentka dokončí UI stávajícího dema bez přidávání doménových pravidel:

- Karta zobrazí čas přes Intl.DateTimeFormat s explicitním Europe/Prague, místo a volitelný popis. Chybějící volitelné údaje nezanechají prázdné řádky.
- Component testy pokryjí obsah, chybějící volitelné údaje a změnu vybrané události.
- Zachovat schválený mobilní detail přes celou obrazovku a existující pravý plovoucí panel na desktopu (odchylka z 5. 11. 2026). Ověřit dlouhý obsah: může rolovat a zavření zůstane dostupné.
- Mapová konfigurace se přesune do map-config.ts se zachováním CARTO a atribuce.
- Dynamický import dostane loading stav.

Další designové úpravy a sdílené komponenty tlačítek a nadpisů jsou navazující témata k samostatné domluvě; nejsou podmínkou dokončení této fáze.

## Postup a ověření

Postupovat po jednom malém mentoringovém kroku podle AGENTS.md. Zachovat výběr, všechny způsoby zavření a řízení fokusu z 2A. Ověřit obsah a přepínání karty testy, dlouhý obsah a layout na mobilu i desktopu v prohlížeči. Zachovat mapu, Add event a atribuci.

Před dokončením zkontrolovat diff, spustit testy, lint, format check, typecheck a produkční build; ověřit preview. Aktualizovat handoff, vytvořit vlastní závěrečný commit a schválený PR s reviewerem bobescz. Potom pokračovat do 2B.

**Navržený commit:** `feat: complete event panel and map UI`
