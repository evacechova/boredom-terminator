# Šablona pull requestu

## Kontext

Studentka 5. 11. 2026 určila závaznou strukturu návrhů pull requestů pro tento projekt.

## Pravidla

- Nahoře vždy uvést konkrétní název PR podle skutečně provedené práce.
- První sekce popisu je „Popis“: stručně, ale dostatečně konkrétně vysvětlit provedené změny.
- Pod popisem uvést krátkou podsekci „Známé nedostatky a navazující PR“. Zapsat omezení a práci vědomě odloženou do samostatného PR.
- Následuje sekce „Screenshoty před a po“ s místem pro oba snímky. Chybějící screenshoty označit jako nedoplněné; nevydávat je za hotové.
- Potom uvést „Akceptační kritéria“ jako checklist. Splnění označit pouze podle skutečného ověření; rozlišovat testy, ruční potvrzení studentky a neověřené podmínky.
- Na konci uvést odkaz na Vercel preview, pokud je známý. Nevymýšlet URL a nezaměňovat produkční URL za preview.
- Před vytvořením PR poslat do chatu název, celý popis, zdrojovou a cílovou větev; vyčkat na výslovné schválení. Reviewer je bobescz, merge strategií Squash and merge.

## Struktura popisu

```markdown
## Popis

Stručný a konkrétní popis výsledného chování a změn.

### Známé nedostatky a navazující PR

- Vědomě odložená práce nebo známé omezení.

## Screenshoty před a po

### Před

Doplnit screenshot.

### Po

Doplnit screenshot.

## Akceptační kritéria

- [ ] Konkrétní ověřitelná podmínka.

## Vercel preview

[Otevřít preview](SKUTECNA_PREVIEW_URL)
```

Sekci Vercel preview použít pouze se skutečnou URL. Tato šablona nemění požadavek AGENTS.md na schválení obsahu před vytvořením PR.
