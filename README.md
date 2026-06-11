# Netflix Clone — Progetto Esame Frontend

Applicazione web multi-pagina ispirata a Netflix, sviluppata con HTML, CSS e JavaScript vanilla.
Dati forniti dalle API pubbliche di [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Struttura del progetto

```
progetto/
├── index.html          # Home
├── movies.html         # Pagina film
├── series.html         # Pagina serie TV
├── profile.html        # Pagina profilo
├── detail.html         # Dettaglio film/serie (extra)
├── css/
│   └── style.css
└── js/
    ├── config.js       # Token TMDB — NON incluso nel repo (vedi config.example.js)
    ├── config.example.js
    ├── api.js          # fetchFromTMDB, fetchDetailFromTMDB
    ├── utils.js        # createCard, renderGrid, showLoading
    ├── main.js         # Logica Home
    ├── movies.js       # Logica pagina Film
    ├── series.js       # Logica pagina Serie TV
    └── detail.js       # Logica pagina Dettaglio
```

## Come aprire in locale

Il sito richiede un server locale (non basta aprire i file con `file://` a causa delle chiamate API).

**Opzione 1 — Live Server (VS Code, consigliata)**
1. Installa l'estensione **Live Server** di Ritwick Dey in VS Code
2. Apri la cartella del progetto in VS Code
3. Clicca su **"Go Live"** nella barra in basso a destra
4. Il browser si apre su `http://127.0.0.1:5500`

**Opzione 2 — npx serve**
```bash
npx serve .
```
Poi apri `http://localhost:3000` nel browser.

## Configurazione API Key

1. Copia `js/config.example.js` → `js/config.js`
2. Incolla il tuo **API Read Access Token (v4)** da [themoviedb.org → Impostazioni → API](https://www.themoviedb.org/settings/api)
3. Il file `js/config.js` è escluso da Git (vedi `.gitignore`) — non viene mai committato

## Endpoint TMDB utilizzati

Tutti gli endpoint usano il parametro `language=it-IT` per ottenere titoli e descrizioni in italiano.

| Pagina | Endpoint | Note |
|---|---|---|
| Home — film del momento | `GET /trending/movie/day` | — |
| Home — serie del momento | `GET /trending/tv/day` | — |
| Film — Al cinema ora | `GET /movie/now_playing` | Endpoint dedicato scelto per la pagina /movies |
| Film — Popolari | `GET /movie/popular` | — |
| Film — Più votati | `GET /movie/top_rated` | — |
| Serie — In onda ora | `GET /tv/on_the_air` | Endpoint dedicato scelto per la pagina /series |
| Serie — Popolari | `GET /tv/popular` | — |
| Serie — Più votate | `GET /tv/top_rated` | — |
| Dettaglio film | `GET /movie/{movie_id}` | Aperto cliccando su una card film |
| Dettaglio serie | `GET /tv/{tv_id}` | Aperto cliccando su una card serie |

Base URL: `https://api.themoviedb.org/3`  
Immagini poster: `https://image.tmdb.org/t/p/w500{poster_path}`  
Immagini backdrop: `https://image.tmdb.org/t/p/w1280{backdrop_path}`

## Autore

Alessandro Tabaku — Corso Frontend  
[Repository GitHub](https://github.com/tabakualessandro-gif/esame-frontend-net)
