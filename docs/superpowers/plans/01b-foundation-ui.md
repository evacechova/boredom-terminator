# Fáze 1B – Základní UI a první nasazení

> Režim: studentka implementuje, mentor vysvětluje a kontroluje. Bez výslovné žádosti mentor nepíše produkční kód ani testy.

**Větev:** `01-foundation-ui`

**Závisí na:** merge Fáze 1A z větve `01-nextjs-foundation`

**Výsledek:** Otestovaná základní stránka s dočasným logem, vlastním daisyUI tématem a veřejnou URL.

**Specifikace:** části 1–5, 16 a základ akceptačních podmínek.

## Na co se soustředíme

- Jak React Testing Library hledá prvky podle role a přístupného názvu.
- TDD cyklus RED–GREEN na malé Server Component stránce.
- Jak `next/image` a interní odkazy vstupují do renderovaného HTML.
- Jak Tailwind a daisyUI vstupují do výsledného CSS.
- Jak funguje první deployment a proč jej děláme brzy.

## Mentoringové kroky

1. Obnovit rozpracovaný `src/app/page.test.tsx` a zkontrolovat jeho aktuální stav.
2. Dokončit testy pro heading `Boredom Terminator`, přístupně pojmenované logo a odkaz `Add event` vedoucí na `/events/new`.
3. Spustit testy a ověřit, že všechny selžou pouze kvůli chybějícímu požadovanému obsahu.
4. Upravit základní stránku minimálním řešením, aby testy prošly.
5. Přidat daisyUI a vlastní téma odvozené z loga. Neřešit finální obrazovku mapy.
6. Spustit testy, lint, format check, typecheck a produkční build.
7. Nasadit základní stránku na schválený hosting a uložit URL do README.
8. Zkontrolovat diff, aktualizovat handoff a uzavřít fázi commitem a pull requestem.

## Testy a ověření

- Test najde heading `Boredom Terminator`.
- Test najde odkaz `Add event` vedoucí na `/events/new`.
- Test najde obrázek s přístupným názvem.
- `npm test` projde.
- `npm run lint` projde.
- `npm run format:check` projde.
- `npm run typecheck` projde.
- `npm run build` projde.
- Veřejná URL zobrazí stejnou základní stránku bez lokálního serveru.

## Fáze neobsahuje

- Leaflet, GPS, `localStorage`, React Hook Form, Zod ani doménovou logiku.
- Hotový design hlavní obrazovky.
- Implementaci formuláře.

## Doporučený závěrečný commit

`feat: add foundation landing page`

Commit provede mentor pouze na výslovnou žádost.

## Handoff

Do `status.md` zapsat veřejnou URL, ověřovací příkazy, výsledný commit a první krok Fáze 2. Pokud hosting vyžadoval nestandardní postup, přidat deviation nebo memory.
