# Boredom Terminator MVP – specifikace návrhu

> Stav: schváleno 24. 10. 2026
>
> Datum: 24. 10. 2026

## 1. Záměr

Boredom Terminator je mobile-first webová aplikace pro objevování menších K-pop akcí v Praze. Má uživateli rychle odpovědět na otázku „Co se děje poblíž teď nebo brzy?“ bez registrace a bez složitého vyhledávání.

Projekt vzniká v tříměsíčním mentoringu. Výsledkem má být funkční veřejné demo a procvičení Next.js, Reactu, map, geolokace, formulářů, validace, testování a oddělení business logiky od UI.

## 2. Cíle

- Zobrazit pražské K-pop události na interaktivní mapě.
- Standardně zobrazit probíhající události a události začínající během následujících 24 hodin.
- Umožnit filtrování podle data začátku a městské části.
- Zobrazit stručný panel vybrané události bez samostatné detailní stránky.
- Umožnit přidat událost bez účtu a uložit ji do `localStorage`.
- Zachovat použitelnost při odmítnutí GPS, selhání mapových dlaždic nebo částečně poškozených lokálních datech.
- Poskytnout rozumné minimum přístupnosti pro klávesnici a čtečky obrazovky.
- Nasadit aplikaci na veřejnou URL.

## 3. Ne-cíle a anti-cíle

MVP nebude obsahovat:

- databázi, sdílený backend ani synchronizaci mezi uživateli,
- přihlášení,
- fotografie,
- komentáře, reputaci, potvrzování nebo moderaci,
- plnou detailní stránku události,
- vlastní navigaci nebo náhled trasy,
- filtrování podle podkategorie,
- automatické ukládání rozepsaného formuláře,
- PWA, push notifikace ani offline režim,
- produkční škálování nebo řešení veřejného zneužití.

Projekt nesmí předstírat sdílená data, ověřený stav události ani funkce budoucího backendu.

## 4. Zvažované přístupy

### Architektura

1. Jedna klientská stránka s logikou přímo v komponentách: rychlý začátek, ale obtížné testování a pozdější výměna úložiště.
2. Layered frontend-first: oddělená doménová, datová a UI vrstva; malé počáteční náklady a čistá cesta k budoucímu backendu.
3. Backend-first: sdílená data od začátku, ale nepřiměřený rozsah pro mentoringové MVP.

Vybrána byla varianta 2. Umožní testovat pravidla bez Reactu a později vyměnit `localStorage` za databázový repository bez přepisování UI.

### Stylování

1. CSS Modules: minimum závislostí, více ruční práce na konzistenci komponent.
2. Samotný Tailwind CSS: vysoká kontrola, ale více opakované práce na základních komponentách.
3. Tailwind CSS + daisyUI + vlastní téma: rychlé sestavení přístupných základů a možnost zachovat vlastní vizuální identitu.

Vybrána byla varianta 3. daisyUI se použije pro základní prvky; mapa, markery a specifické rozložení dostanou vlastní styly.

### Formulář

1. Ruční React state a vlastní validační funkce: nejméně abstrakcí, ale více obslužného kódu.
2. React Hook Form + Zod: správa touched/error stavů, validace při opuštění pole i odeslání a znovupoužitelná datová schémata.
3. Komplexní globální formulářový stav: zbytečný pro jednu route.

Vybrána byla varianta 2.

### Stav aplikace

Vestavěný React state pokrývá rozsah MVP. Redux se nepoužije. Zustand nebo Jotai lze přidat pouze po prokázané potřebě během vývoje.

## 5. Technologie

- Next.js s App Routerem
- React a TypeScript
- `npm` a `package-lock.json`
- Turbopack; Webpack pouze jako fallback konkrétní nekompatibility
- Leaflet + React Leaflet
- OpenStreetMap standard tiles pro malé soukromé demo s povinnou atribucí
- Browser Geolocation API
- `localStorage`
- Tailwind CSS + daisyUI
- Geist Sans
- React Hook Form + `@hookform/resolvers`
- Zod
- Jest + React Testing Library
- Playwright s Chromium

Konfigurace mapových dlaždic oddělí URL, atribuci a zoom limity od mapové komponenty.

## 6. Datový model

```ts
type EventCategory = "random_play_dance" | "cover_shoot" | "one_off_kpop_class";

type Event = {
  id: string;
  title: string;
  category: EventCategory;
  description?: string;
  startsAt: string;
  endsAt?: string;
  location: {
    latitude: number;
    longitude: number;
    city: "Praha";
    district?: PragueDistrict;
  };
  venueName?: string;
  sourceUrl?: string;
  createdAt: string;
};
```

Všechny události MVP spadají do K-pop zaměření. Samostatné pole pro komunitu zatím není potřeba. Podkategorie se ukládá a zobrazuje, ale nepoužívá se jako filtr.

Pokud uživatel nezadá konec, doménová vrstva vypočítá dvě hodiny od začátku. Zadaný nebo vypočtený konec musí být při uložení v budoucnosti.

Datum a čas se interpretují v `Europe/Prague`. Aplikace ukládá `startsAt`, `endsAt` a `createdAt` jako UTC ISO řetězce a pro zobrazení je převádí zpět do pražského času.

## 7. Datová a stavová architektura

### Doménová vrstva

Obsahuje typy a čisté funkce pro:

- validaci a normalizaci události,
- výpočet výchozího konce,
- filtrování podle času, data a městské části,
- řazení událostí,
- vytvoření bezpečného odkazu na Google Maps.

Výběr konkrétního data zobrazí pouze události, jejichž `startsAt` leží v daném pražském kalendářním dni. Událost začínající před vybraným dnem se nezobrazí, ani když do něj svým trváním zasahuje.

Doménová vrstva nezávisí na Reactu, Leafletu ani browser API.

### Datová vrstva

Rozhraní `EventRepository` poskytne minimálně `list()` a `add()`.

První implementace:

- načte vestavěná seed data,
- načte uživatelské události z `localStorage`,
- ověří lokální záznamy přes Zod,
- vrátí platné seed a lokální události jako jeden seznam,
- neplatné lokální záznamy přeskočí bez automatického smazání.

Seed data použijí stabilní identity, texty a souřadnice. Jejich časy vytvoří testovatelná factory relativně k předanému `now`, aby demo vždy obsahovalo probíhající, blízké i pozdější události.

### UI stav

React drží pouze přechodný stav:

- aktuální filtry,
- `selectedEventId`,
- aktuální GPS polohu a její stav,
- loading, warning a error stavy,
- krátké potvrzení `Event added`.

Otevřený panel ani GPS poloha se neukládají. Souřadnice vytvořené události se ukládají jako její data.

## 8. Hlavní obrazovka mapy

Po otevření aplikace uživatel uvidí Prahu a události, které probíhají nebo začnou během následujících 24 hodin.

Výběr konkrétního data nahradí výchozí 24hodinové okno. Interval začíná v `00:00` vybraného dne a končí před `00:00` následujícího dne v `Europe/Prague`; filtr posuzuje pouze `startsAt`.

Obrazovka obsahuje:

- mapu,
- filtr data,
- volitelný filtr `Praha 1` až `Praha 22`,
- jednoduché placeholder markery,
- výrazné tlačítko `Add event`,
- kompaktní panel vybrané události,
- loading, empty, warning a error stavy.

Kliknutí na jiný marker změní `selectedEventId` a obsah panelu. Kliknutí do prázdné mapy panel zavře.

## 9. Kompaktní panel události

### Umístění

- Mobil: spodní panel nad mapou.
- Desktop: plovoucí boční panel vpravo.
- Obsah může rolovat, pokud se nevejde.

### Obsah

- podkategorie,
- název,
- datum a čas,
- název místa; při jeho absenci městská část,
- celý krátký popis,
- `View source`, pouze pokud existuje `sourceUrl`.

Řádek místa funguje jako odkaz na přesné souřadnice v Google Maps. Samostatné tlačítko `Open in maps` nebude.

- Desktop otevře externí mapu v nové kartě nebo okně podle prohlížeče.
- Mobil přejde ve stejné kartě; operační systém může otevřít aplikaci Google Maps.
- Odkaz otevřený v nové kartě použije `rel="noopener noreferrer"`.

### Zavření

- viditelné tlačítko s přístupným názvem,
- klávesa `Escape`,
- kliknutí do prázdné mapy.

Kliknutí na jiný marker panel nezavře; pouze změní obsah. Gesto tažením není součástí MVP.

## 10. Formulář přidání události

Route `/events/new` používá jednu rolovací stránku.

Pořadí:

1. název a podkategorie,
2. datum a čas,
3. poloha,
4. volitelné informace,
5. kontrola a uložení.

Povinná pole:

- název,
- podkategorie,
- datum,
- čas začátku,
- poloha.

Volitelná pole:

- čas konce,
- městská část z pevného seznamu `Praha 1` až `Praha 22`,
- název místa,
- krátký popis,
- zdrojový odkaz.

Na mobilu formulář zabere celou obrazovku a obsahuje plnoširokou mapovou sekci. Na desktopu je formulář plovoucí panel nad mapou; viditelná část mapy zůstává interaktivní a slouží k výběru polohy.

## 11. Výběr polohy a GPS

- Výchozí pohled formuláře je Praha bez vybraného pinu.
- GPS nebo kliknutí na mapu vytvoří pin.
- Pin lze přetáhnout.
- Kliknutí na jiné místo přesune existující pin.
- Formulář vždy použije poslední polohu pinu.
- Odmítnutí GPS nezablokuje ruční výběr.
- GPS poloha se uchovává pouze v paměti.
- Na hlavní mapě GPS spustí až uživatel akcí `Use my location`.
- Úspěšná GPS na hlavní mapě pouze vycentruje mapu; nemění filtry, pořadí ani nezobrazuje vzdálenost.
- Městskou část vybírá uživatel ručně; MVP nepoužívá reverzní geokódování.

Text při zamítnutí:

`Location access is off. Select the event location on the map.`

Text při nedostupnosti nebo timeoutu:

`We couldn't find your location. Try again or select the event location on the map.`

Druhý stav nabídne `Try again`.

## 12. Validace

React Hook Form řídí formulářový stav. Zod definuje validační pravidla a kontroluje také data z `localStorage`.

- Upravené pole se validuje po opuštění.
- Odeslání validuje celý formulář.
- Chyba se zobrazí přímo pod příslušným polem.
- Pole použije `aria-invalid` a propojení chyby přes `aria-describedby`.
- Po neúspěšném odeslání se fokus přesune na první chybné pole.
- Hodnoty zůstanou zachované.
- Konec musí být pozdější než začátek.
- Zadaný nebo vypočtený konec musí být při uložení v budoucnosti.

MVP nemá serverový zápis. Až vznikne backend, server musí data ověřit znovu; klientská validace zůstane kvůli okamžité zpětné vazbě.

## 13. Uložení a návrat

Po úspěchu:

1. repository trvale zapíše událost do `localStorage`,
2. aplikace se vrátí na hlavní mapu,
3. mapa se vycentruje na novou událost,
4. její panel se otevře,
5. zobrazí se `Event added`.

Při selhání zápisu zůstane uživatel ve formuláři. Data se zachovají a nad tlačítkem `Add event` se zobrazí chyba s možností opakování. Událost se nesmí objevit na mapě před úspěšným trvalým zápisem.

## 14. Chybové a prázdné stavy

### Poškozená lokální data

- Platné záznamy a seed data se zobrazí.
- Neplatné položky se přeskočí a zůstanou v úložišti.
- Neblokující varování nabídne `Remove invalid data`.
- Akce po potvrzení přepíše úložiště pouze platnými záznamy.
- Nečitelná struktura celého seznamu nabídne potvrzovanou akci `Reset saved events`.

### Selhání mapových dlaždic

- Zobrazí se `Map couldn't load` a `Try again`.
- Navigace a filtry zůstanou funkční.
- Poskytovatel se automaticky nezmění.
- Výběr polohy na prázdném podkladu se vypne.
- Mapu nahradí textový seznam filtrovaných událostí.
- Seznam zachová odkazy na zdroj a Google Maps.
- Ve formuláři se zachovají všechna vyplněná data a zobrazí se `Try again` i možnost použít GPS.
- Úspěšná GPS poskytne povinné souřadnice a dovolí formulář dokončit bez dlaždic.
- Bez funkční mapy nebo GPS nelze polohu bezpečně vybrat; formulář zůstane zachovaný a vysvětlí blokující stav.

### Prázdný výsledek

- Mapa zůstane viditelná bez markerů.
- Zobrazí se `No events found for these filters`.
- `Reset filters` obnoví výchozí filtry.
- `Add event` zůstane dostupné.

## 15. Přístupnost

- Markery jsou ovladatelné jako tlačítka a mají přístupný název události.
- Interaktivní prvky mají viditelný fokus.
- Po otevření panelu se fokus přesune do panelu.
- Po zavření se vrátí na marker, který panel otevřel.
- `Escape` zavře panel.
- Formulářová pole mají viditelné popisky a programově propojené chyby.
- Textový fallback mapy je dostupný klávesnicí a čtečkou obrazovky.
- Barva není jediným nositelem informace.
- Text a ovládací prvky musí mít použitelný kontrast.

## 16. Vizuální směr

Styl je minimalistický, hravý a „cute“. Dočasnou značku tvoří dodaný obrázek robotické kočky.

Výchozí návrh barevných tokenů odvozených z obrázku:

- `primary`: mentolová `#63E4C6`,
- `secondary`: jemná růžová `#FF8FA8`,
- `accent`: sytá růžová `#FF356B`,
- `base-100`: teplá bílá `#FFFCFA`,
- `neutral`: tmavá grafitová `#30313A`,
- `base-200`: světlá šedá `#E5E5EA`.

Hodnoty jsou výchozí návrh pro vlastní daisyUI theme. Při prvním vizuálním prototypu lze odstíny upravit kvůli kontrastu a soužití s mapou. Světlá mentolová ani růžová se nepoužijí jako drobný text na světlém pozadí.

Geist Sans bude výchozí písmo. daisyUI dodá základ tlačítek, formulářů, panelů a hlášek. Výsledné komponenty musí používat vlastní téma, ne výchozí vzhled daisyUI.

Všechny podkategorie zpočátku používají stejný jednoduchý marker. Vlastní emoji nebo ilustrace nejsou blokátorem MVP.

## 17. Testovací strategie

### Unit testy

- časová pravidla a dvouhodinový výchozí konec,
- validace a normalizace,
- filtrování a řazení,
- validní a poškozená data z `localStorage`,
- tvorba externího mapového odkazu.

### Component testy

- formulářové chyby po opuštění pole a při odeslání,
- fokus na první chybu,
- filtry,
- otevření, změna obsahu a zavření event panelu,
- GPS error stavy,
- mapový a textový fallback.

### E2E testy v Chromiu

1. Zobrazení a filtrování událostí.
2. Otevření markeru a event panelu.
3. Vytvoření události, návrat na mapu a zobrazení nové události.

Hlavní scénáře se ověří také mobilní emulací. Snapshoty nebudou hlavní strategií. Rozsah testů se při každé implementační fázi upraví podle rizika, ale uvedené klíčové chování musí zůstat pokryté.

## 18. Akceptační podmínky MVP

- Projekt lze nainstalovat a spustit přes `npm`.
- Produkční build projde.
- Hlavní stránka zobrazí mapu Prahy a seed události.
- Výchozí 24hodinový filtr funguje.
- Filtr konkrétního data pracuje podle pražského data začátku a nahradí výchozí 24hodinové okno.
- Filtr městské části funguje pro seed i uživatelské události s vybranou městskou částí.
- Event panel odpovídá mobilnímu a desktopovému chování.
- Odkaz místa otevře přesné souřadnice v Google Maps.
- Formulář vytvoří platnou událost a uloží ji do `localStorage`.
- Obnovení stránky zachová vytvořenou událost, ale ne GPS polohu ani otevřený panel.
- GPS odmítnutí nezablokuje hlavní scénáře.
- Poškozená lokální data nezablokují seed data.
- Selhání mapy nabídne použitelný textový fallback.
- Klíčové interakce fungují klávesnicí.
- Unit, component a E2E testy vybrané pro implementační plán projdou.
- Veřejná URL funguje bez lokálního serveru a je zapsaná v repozitáři.

## 19. Zbývající rozhodnutí pro implementační plán

Následující technické detaily může určit implementační plán bez změny produktu:

- přesná struktura složek a názvy modulů,
- konkrétní breakpoint mezi mobilním a desktopovým panelem,
- přesné limity délky textových polí,
- způsob generování ID,
- konkrétní forma notifikace `Event added`,
- detaily mockování Leafletu a geolokace v testech,
- hosting veřejného dema.

Budoucí backend, databáze a přihlášení zůstávají samostatným budoucím návrhem. Stejně tak reverzní geokódování a automatický draft formuláře. Budoucí draft se může ukládat po opuštění pole nebo krátké prodlevě, obnovit po návratu, nabídnout `Discard draft` a smazat po úspěšném vytvoření události.
