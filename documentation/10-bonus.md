# Bonusová Fáze 10 – Review a další vývoj

**Větev:** `10-post-mvp-planning`. **Závisí na:** veřejně ověřeném MVP z Fáze 9.

**Výsledek:** Stručné review a vybrané další úkoly. Tato fáze neimplementuje nové funkce a není podmínkou dokončení MVP.

## Postup

1. Porovnat skutečný produkt, kód a ověření s [MVP](mvp.md). Zapsat jen konkrétní problémy s důkazem a dopadem; nesplněné MVP řešit před novými funkcemi.
2. Projít kandidáty níže, odstranit hotové nebo neaktuální a se studentkou vybrat další směr. U ponechaného bodu stačí přínos, hlavní závislost a nejbližší rozhodnutí.
3. Vybraný celek převést na konkrétní úkol; větší nebo nejasný nejprve na samostatnou specifikaci. Plán vzniká až po rozhodnutí o rozsahu. Aktuální služby a ceny ověřit při výběru.
4. Výsledek a další krok zapsat do statusu. Samostatný report přidat jen při rozsáhlejším review; nevytvářet další paralelní backlog.

## Kandidáti k pozdějšímu výběru

- **Účty a vlastnictví:** přihlášení, vazba události na autora a oprávnění. Neon přidání přihlášení umožňuje; konkrétní službu vybrat v této etapě. Starším anonymním záznamům nepřisuzovat autora bez ověření. Při návrhu přihlášení vyjasnit cílový věk, vhodné poskytovatele a soukromí.
- **Další CRUD:** editace a mazání s pravidly oprávnění a zachování historie. Skončené události se zpětně neupravují; s účty musí zákaz a vazbu na autora vynucovat server.
- **Jazyky:** soustředit UI texty i přístupné názvy do slovníků a přidat češtinu; uživatelský obsah řešit odděleně.
- **Mapa a hledání:** clusterování pinů, vlastní markery, filtr kategorií, městské části, taneční styl, jemnější typy akcí včetně tradingu a další města či komunity. Reverzní geokódování a návrh kategorie jen podle prokázané potřeby.
- **Vizuální dokončení:** hierarchie detailu, vztah panelu a pluska, případná šipka zpět a sdílené UI prvky tam, kde ještě chybí. Hotovou komponentu nevytvářet znovu.
- **Fotografie a zdroje:** fotografie/screenshot a případný povinný podklad akce; společně vyřešit soubory, oprávnění a moderaci.
- **Důvěryhodnost a moderace:** potvrzení konání, výzva autorovi k potvrzení pokračování, odhalování duplicit, nahlašování a administrace. Reputace až s jasnou identitou; AI je případná pomoc, ne předpoklad.
- **Bohatší komunita:** plný detail, komentáře, aktualizace, galerie minulých akcí, hledání doprovodu a sdílení hudebního vkusu. Závisí na identitě a moderaci; odměny a gamifikace vyžadují samostatné rozhodnutí.
- **Draft formuláře:** automatické uložení rozpracovaného obsahu, obnovení a zahození; vyčištění po úspěšném vytvoření a chování při změně schématu.
- **Instalace a návrat uživatele:** PWA, push a offline posoudit samostatně podle přínosu a nároků na cache, oprávnění a synchronizaci.

Nápad v tomto seznamu není příslib implementace ani pořadí. Dokončené či zamítnuté položky se odstraní; důvod zásadního rozhodnutí zůstane u příslušné specifikace nebo plánu, historii uchovává Git.
