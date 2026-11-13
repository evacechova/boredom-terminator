# CARTO Positron – limity mapových dlaždic

## Kontext

Studentka požádala o mapový podklad CARTO Positron. Dne 5. 11. 2026 mentor na výslovnou žádost studentky zapojil podklad do stávajícího TileLayer. Klíč se načítá z NEXT_PUBLIC_CARTO_API_KEY; lokálně z ignorovaného .env.local, na Vercelu z proměnných příslušného prostředí. Po změně klíče je potřeba restart vývojového serveru nebo nový deployment.

## Ověřený poznatek

Podle podmínek ověřených 5. 11. 2026 CARTO vyžaduje API klíč a viditelnou atribuci OpenStreetMap a CARTO. Bezplatný limit pro nekomerční použití je 5 milionů požadavků měsíčně; pro komerční použití je 1 milion požadavků měsíčně. Požadavky se počítají společně přes všechny klíče účtu, nejde o počet návštěv aplikace.

Zdroj: [CARTO Basemaps API key a aktuální limity](https://carto.com/basemaps/apikey/).

## Dopad na další práci

Před přechodem projektu na komerční využití znovu ověřit aktuální podmínky a ceny CARTO, odhadnout měsíční počet požadavků na dlaždice a nastavit sledování spotřeby. Při očekávaném překročení komerčního bezplatného limitu vyřešit placený plán nebo změnu poskytovatele mapového podkladu.
