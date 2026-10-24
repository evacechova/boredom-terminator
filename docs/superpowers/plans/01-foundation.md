# Fáze 1 – Next.js základ a první nasazení

> Režim: studentka implementuje, mentor vysvětluje a kontroluje. Bez výslovné žádosti mentor nepíše produkční kód.

**Větev:** `phase/01-foundation`

**Závisí na:** kontrolním commitu dokumentace na `main`

**Výsledek:** Spustitelná Next.js aplikace s TypeScriptem, základním testem, dočasným logem, vlastním daisyUI tématem a veřejnou URL.

**Specifikace:** části 1–5, 16 a základ akceptačních podmínek.

## Na co se soustředíme

- Co vytváří `create-next-app` a proč jednotlivé soubory existují.
- Rozdíl mezi App Routerem, layoutem a page route.
- Základní hranice Server a Client Components; v této fázi klientské API ještě nepotřebujeme.
- Jak fungují `package.json`, `package-lock.json` a npm skripty.
- Jak Tailwind a daisyUI vstupují do výsledného CSS.
- Co ověřuje unit/component test, lint a produkční build.
- Jak funguje první deployment a proč jej děláme brzy.

## Mentoringové kroky

1. Zkontrolovat Node.js, npm, Git a čistý výchozí stav.
2. Založit větev a projít bezpečný způsob scaffoldingu do existujícího neprázdného repozitáře.
3. Nechat studentku spustit scaffold a společně projít vzniklé soubory.
4. Spustit výchozí aplikaci a vysvětlit request od prohlížeče po `page.tsx`.
5. Přidat Jest a React Testing Library. Nejprve pochopit, proč samotný build nenahrazuje test UI.
6. Napsat malý failing test pro název aplikace, logo a odkaz `Add event`.
7. Upravit základní stránku tak, aby test prošel.
8. Přidat daisyUI a vlastní téma odvozené z loga. Neřešit finální obrazovku mapy.
9. Spustit testy, lint a produkční build.
10. Nasadit základní stránku na schválený hosting a uložit URL do README.
11. Zkontrolovat diff a uzavřít fázi commitem.

## Testy a ověření

- Test najde heading `Boredom Terminator`.
- Test najde odkaz `Add event` vedoucí na `/events/new`.
- Test najde obrázek s přístupným názvem.
- `npm run lint` projde.
- `npm run build` projde.
- Veřejná URL zobrazí stejnou základní stránku bez lokálního serveru.

## Fáze neobsahuje

- Leaflet, GPS, `localStorage`, React Hook Form, Zod ani doménovou logiku.
- Hotový design hlavní obrazovky.
- Implementaci formuláře.

## Doporučený závěrečný commit

`chore: scaffold Next.js application`

Commit provede mentor pouze na výslovnou žádost.

## Handoff

Do `status.md` zapsat verze Node/npm/Next.js, veřejnou URL, ověřovací příkazy, commit a první krok Fáze 2. Pokud scaffold nebo hosting vyžadoval nestandardní postup, přidat deviation nebo memory.
