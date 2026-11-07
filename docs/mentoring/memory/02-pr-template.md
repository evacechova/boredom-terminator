# Šablona pull requestu

## Kontext

Studentka 5. 11. 2026 určila závaznou strukturu návrhů pull requestů pro tento projekt.

## Pravidla

- Nahoře v těle PR description vždy uvést konkrétní název PR jako H1 podle skutečně provedené práce; nestačí samostatné pole názvu PR.
- První sekce pod názvem je „Změny“: stručně, ale dostatečně konkrétně vysvětlit provedené změny.
- Pod popisem uvést krátkou podsekci „Známé nedostatky a navazující PR“. Zapsat omezení a práci vědomě odloženou do samostatného PR.
- Následuje sekce „Screenshoty před a po“ s místem pro oba snímky. Chybějící screenshoty označit jako nedoplněné; nevydávat je za hotové.
- Potom uvést „Akceptační kritéria“ jako checklist. Splnění označit pouze podle skutečného ověření; rozlišovat testy, ruční potvrzení studentky a neověřené podmínky.
- Na konci vždy uvést samostatnou sekci „Vercel preview“; pokud URL není známá, napsat „Odkaz zatím není doplněný“. Pokud je známý, uvést odkaz. Nevymýšlet URL a nezaměňovat produkční URL za preview.
- Před vytvořením PR poslat do chatu název, celý popis, zdrojovou a cílovou větev; vyčkat na výslovné schválení. Reviewer je bobescz, merge strategií Squash and merge.

## Struktura popisu

```markdown
# Konkrétní název PR

## Změny

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

Atribuci poskytovatelů mapy neuvádět mezi akceptačními kritérii; patří do popisu změn. V sekci Vercel preview použít pouze skutečnou URL nebo označit chybějící odkaz. Tato šablona nemění požadavek AGENTS.md na schválení obsahu před vytvořením PR.
