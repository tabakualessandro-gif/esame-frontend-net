// Funzione che coordina il caricamento dei dati sulla Homepage
async function inizializzaHome() {
    // 1. Recuperiamo i prodotti simulati da js/api.js
    const filmPopolari = await fetchFromTMDB('/movie/popular');
    const filmTrending = await fetchFromTMDB('/trending/movie/week');

    // 2. Popoliamo dinamicamente i contenitori HTML
    mostraFilmInGriglia('grid-popolari', filmPopolari);
    mostraFilmInGriglia('grid-novita', filmTrending);
}

/**
 * Genera le card in stile Netflix e le appende al rispettivo contenitore
 */
function mostraFilmInGriglia(idContenitore, listaFilm) {
    const contenitore = document.getElementById(idContenitore);
    if (!contenitore) return;

    contenitore.innerHTML = ''; // Svuota i testi provvisori

    const BASE_IMG_URL = "https://image.tmdb.org/t/p/w300";

    listaFilm.forEach(film => {
        // Estraiamo l'anno di uscita
        const annoUscita = film.release_date ? film.release_date.split('-')[0] : 'N.D.';
        
        // URL del poster originale di TMDB
        const urlPoster = film.poster_path ? `${BASE_IMG_URL}${film.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image';

        // Creazione del tag della card
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        card.innerHTML = `
            <div class="poster-wrapper">
                <img src="${urlPoster}" alt="${film.title}">
            </div>
            <div class="card-details">
                <h3>${film.title}</h3>
                <div class="meta-info">
                    <span class="year">${annoUscita}</span>
                    <span class="rating">⭐ ${film.vote_average.toFixed(1)}</span>
                </div>
            </div>
        `;

        contenitore.appendChild(card);
    });
}

// Avvia tutto al caricamento della pagina
document.addEventListener('DOMContentLoaded', inizializzaHome);