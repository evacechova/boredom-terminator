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

## Schválené světlé téma

Téma `boredom-terminator` používá pouze světlý režim. Tmavší mint slouží pro hlavní akce, světlý mint pro akcenty a malinová pro sekundární zvýraznění. Stavové barvy zachovávají běžný význam, ale používají tlumené odstíny sladěné s logem.

| Token                       | Hodnota   |
| --------------------------- | --------- |
| `--color-base-100`          | `#FFFDFB` |
| `--color-base-200`          | `#F3F8F7` |
| `--color-base-300`          | `#DCEAE7` |
| `--color-base-content`      | `#25323A` |
| `--color-primary`           | `#0F766E` |
| `--color-primary-content`   | `#FFFFFF` |
| `--color-secondary`         | `#BE185D` |
| `--color-secondary-content` | `#FFFFFF` |
| `--color-accent`            | `#2DD4BF` |
| `--color-accent-content`    | `#173A38` |
| `--color-neutral`           | `#25323A` |
| `--color-neutral-content`   | `#FFFFFF` |
| `--color-info`              | `#0E7490` |
| `--color-info-content`      | `#FFFFFF` |
| `--color-success`           | `#3F7D5A` |
| `--color-success-content`   | `#FFFFFF` |
| `--color-warning`           | `#F4B740` |
| `--color-warning-content`   | `#3B2F0B` |
| `--color-error`             | `#B4235A` |
| `--color-error-content`     | `#FFFFFF` |

Zaoblení: selector `1rem`, field `0.75rem`, box `1rem`. Téma používá `1px` border, zapnutou jemnou hloubku a žádný noise. Nejpřísnější schválený pár má kontrast `4.89:1`, takže všechny textové páry splňují WCAG AA pro běžný text.

## Mentoringové kroky

1. Obnovit rozpracovaný `src/app/page.test.tsx` a zkontrolovat jeho aktuální stav.
2. Dokončit testy pro heading `Boredom Terminator`, přístupně pojmenované logo a odkaz `Add event` vedoucí na `/events/new`.
3. Spustit testy a ověřit, že všechny selžou pouze kvůli chybějícímu požadovanému obsahu.
4. Upravit základní stránku minimálním řešením, aby testy prošly.
5. Přidat daisyUI jako dev dependency a zkontrolovat instalační skripty.
6. V `globals.css` ponechat pouze vlastní výchozí světlé téma `boredom-terminator` se schválenými tokeny a odstranit původní dark-mode media query.
7. Na základní stránce použít theme tokeny a daisyUI `btn btn-primary` pro `Add event`. Neřešit finální obrazovku mapy.
8. Spustit testy, lint, format check, typecheck a produkční build.
9. Nasadit základní stránku na schválený hosting a uložit URL do README.
10. Zkontrolovat diff, aktualizovat handoff a uzavřít fázi commitem a pull requestem.

## Testy a ověření

- Test najde heading `Boredom Terminator`.
- Test najde odkaz `Add event` vedoucí na `/events/new`.
- Test najde obrázek s přístupným názvem.
- Build zkompiluje vlastní daisyUI téma bez CSS chyb.
- Landing page zůstane ve světlém tématu i při systémovém dark mode.
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
