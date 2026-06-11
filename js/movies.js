async function inizializzaFilm() {
    showLoading('grid-now-playing');
    showLoading('grid-popolari');
    showLoading('grid-top-rated');

    const nowPlaying = await fetchFromTMDB('/movie/now_playing');
    const popolari = await fetchFromTMDB('/movie/popular');
    const topRated = await fetchFromTMDB('/movie/top_rated');

    renderGrid('grid-now-playing', nowPlaying);
    renderGrid('grid-popolari', popolari);
    renderGrid('grid-top-rated', topRated);
}

document.addEventListener('DOMContentLoaded', inizializzaFilm);
