# Přístup k localStorage při napojení mapy

Repository přijímá objekt `Storage`; browser API se získává až na klientovi. Selhat může už samotné čtení vlastnosti `window.localStorage`, tedy ještě před zavoláním factory. Fáze 4 musí ošetřit i tento případ a zobrazit seedy. `list()` ošetřuje až chyby metod předaného úložiště.

Aktuální kontrakt a důvody jeho volby jsou v [plánu Fáze 3](../../superpowers/plans/03-local-repository.md).
