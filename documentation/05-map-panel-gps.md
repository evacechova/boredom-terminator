# Fáze 5 – Discovery filtry, detail a GPS

**Větev:** `05-map-panel-gps`. **Závisí na:** databázovém GET z Fáze 4.

**Výsledek:** Události z API lze filtrovat; detail má úplný obsah a GPS vycentruje mapu. Pro fallback existuje přístupný textový seznam.

**Specifikace:** [MVP](mvp.md), části Mapa a detail, Selhání a přístupnost.

## Soubory a odpovědnosti

- Existující `EventMapContainer`: zdrojový stav, odvozené filtrované události a jediný výběr.
- Nové prvky filtrů a textového seznamu u discovery celku; GPS hook u mapy. Samostatný controller hook nebo Context vznikne jen při konkrétní potřebě sdílení.
- Existující `EventPanel` a `LeafletMap`: doplnění obsahu a centrování bez druhé implementace.

## Kroky

1. Oddělit načtené události, aktivní filtr a vybrané ID od odvozeného seznamu. Použít existující časové a řadicí funkce.
2. Přidat výchozí rolling režim, datum a reset. Pokud filtr skryje vybranou událost, zavřít detail.
3. Připojit datum k URL podle specifikace. `filterEventsByDate` ověří datum: `undefined` je chyba, `[]` platný prázdný výsledek. Zachovat Back/Forward, ostatní parametry i fragment.
4. Doplnit kategorii a bezpečný zdrojový odkaz do detailu. Zachovat hotovou navigaci, zavírání a fokus.
5. Přidat uživatelem spuštěnou GPS: idle/loading/success/error, denied/unavailable/timeout a retry. Úspěch jen vycentruje mapu.
6. Přidat textový seznam nad stejnými filtrovanými daty a empty state. Seznam je alternativou při výpadku mapy, nikoli druhým trvalým layoutem.

## Ověření a konec

- Cíleně ověřit propojení GET → filtr → markery/detail a reset; nepřepisovat doménové hraniční testy.
- Platné datum bez událostí nehlásí chybu. Neplatný, prázdný a opakovaný URL parametr obnoví výchozí režim s oznámením a opravou URL.
- Historie se dá zobrazit filtrem dne a filtrování ji nemění v databázi.
- GPS chyby neblokují prohlížení; úspěch nemění filtr ani pořadí. Source odkaz nepřijme nebezpečné schéma.
- Existující testy, lint, typecheck, build a mobilní i desktopové ověření projdou. Plný tile fallback dokončí Fáze 8.
