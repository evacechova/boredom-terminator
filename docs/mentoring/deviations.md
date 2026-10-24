# Odchylky od specifikace a plánů

Tento dokument zaznamenává vědomé změny, které ovlivňují rozsah, architekturu, pořadí práce nebo vývojový proces. Běžné opravy překlepů sem nepatří.

## 2026-10-25 – Learner-led mentoring místo agentické implementace

**Původně:** Jeden agentický plán předpokládal, že asistent implementuje úkoly a samostatní agenti je kontrolují.

**Nově:** Studentka píše produkční kód a testy. Asistent vysvětluje koncepty, zadává malé kroky, kontroluje změny a stupňuje nápovědu. Kód mění pouze na výslovnou žádost.

**Důvod:** Hlavním cílem projektu je učení během mentoringu, ne nejrychlejší dodání hotové aplikace.

**Dopad:** Původní agentický plán byl nahrazen a před kontrolním commitem odstraněn. Aktivní roadmapa používá samostatný plán, větev a kontext pro každou fázi.

## 2026-10-25 – Instalace závislostí až při jejich použití

**Původně:** Původní plán instaloval většinu knihoven při scaffoldingu.

**Nově:** Každá fáze přidá pouze knihovny, které právě vysvětluje a používá.

**Důvod:** Studentka lépe uvidí účel každé závislosti a změny zůstanou menší.

**Dopad:** `package-lock.json` se může změnit ve více fázích.

## 2026-10-25 – První nasazení ve Fázi 1

**Původně:** Původní plán odkládal veřejné nasazení na poslední fázi.

**Nově:** Fáze 1 nasadí základní Next.js stránku. Poslední fáze provede finální produkční ověření.

**Důvod:** Odpovídá prvnímu mentoringovému úkolu a včas odhalí problém s hostingem.

**Dopad:** Veřejná URL vznikne brzy a bude se průběžně aktualizovat.
