# Hranice lokálního repository a validace

## Kontext

Fáze 3 implementuje repository nad předaným `Storage` a snímkem `now: Date`. Modul nečte globální browser API při importu. Klíč `boredom-terminator:saved-events:v1` obsahuje pouze JSON pole uživatelských záznamů.

## Ověřený poznatek

- `list()` odděluje neplatné jednotlivé položky (`invalidCount`) od nečitelného formátu a selhání čtení (`storageIssue`). Nečitelné pole nelze automaticky vyčistit; explicitní reset naopak funguje i bez parsování jeho obsahu.
- Výsledek načtení obsahuje také seed data. Nikdy ho nezapisovat jako nový obsah storage: odstranil by neplatné sousedy a uložil seed záznamy.
- Zod při parsování odstraňuje neznámá pole z vraceného objektu. Proto přidávání zachovává původní položky a čištění ukládá původní platné objekty, nikoli očištěné výsledky parsování. Historie i neznámá pole tak přežijí běžné operace.
- `storedEventSchema` kontroluje platnost uložených dat, nikoli aktuálnost události. Historie a volitelné `endsAt` jsou platné. Schéma zároveň kontroluje zadaný konec po začátku.

## Dopad na další práci

Fáze 4 použije kontrakt z `src/core/events/event-repository.ts`. Při získání browserového `localStorage` musí UI ošetřit i případ, kdy selže přístup k samotné vlastnosti `window.localStorage` ještě před předáním do factory; repository ošetřuje chyby metod předaného úložiště.

Fáze 6 znovu použije textová schémata ze `src/core/events/stored-event-schema.ts`; trim a normalizaci formulářového vstupu provede před tvorbou uloženého objektu. Validace konce vůči aktuálnímu času patří k vytváření, nikoli k načítání historie. Fáze 7 vytváří nová ID `user:<UUID>`. Fáze 8 přidá potvrzení před `removeInvalid()` a `resetSaved()`; reset odstraní i lokální historii, ale žádný jiný storage klíč.
