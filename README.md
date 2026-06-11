# Progetto Esame Frontend — Netflix Clone

Sito web ispirato a Netflix fatto per l'esame di Frontend.
Usa le API di TMDB per caricare film e serie TV reali.

## Come aprirlo

Bisogna usare un server locale, non funziona aprendo direttamente il file html.

Se hai VS Code installa l'estensione **Live Server** e clicca "Go Live" in basso a destra.

Altrimenti da terminale:
```
npx serve .
```

## API Key

1. Vai su themoviedb.org, crea un account e vai su Impostazioni → API
2. Copia il token (API Read Access Token v4)
3. Rinomina `js/config.example.js` in `js/config.js` e incolla il token dentro
4. Il file config.js non viene caricato su GitHub perché è nel .gitignore

## Pagine

- `index.html` — home con film e serie in tendenza del giorno
- `movies.html` — film al cinema, popolari e più votati
- `series.html` — serie in onda, popolari e più votate
- `profile.html` — pagina profilo statica
- `detail.html` — dettaglio di un film o serie (si apre cliccando su una card)

## Endpoint usati

| Pagina | Endpoint |
|---|---|
| Home | `/trending/movie/day` e `/trending/tv/day` |
| Film | `/movie/now_playing`, `/movie/popular`, `/movie/top_rated` |
| Serie | `/tv/on_the_air`, `/tv/popular`, `/tv/top_rated` |
| Dettaglio | `/movie/{id}` oppure `/tv/{id}` |

## Autore

Alessandro Tabaku
