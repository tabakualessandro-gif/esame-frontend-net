async function inizializzaFilm() {
    showLoading('grid-now-playing');
    showLoading('grid-popolari');
    showLoading('grid-top-rated');

    const [nowPlaying, popolari, topRated] = await Promise.all([
        fetchFromTMDB('/movie/now_playing'),
        fetchFromTMDB('/movie/popular'),
        fetchFromTMDB('/movie/top_rated')
    ]);

    renderGrid('grid-now-playing', nowPlaying);
    renderGrid('grid-popolari', popolari);
    renderGrid('grid-top-rated', topRated);
}

document.addEventListener('DOMContentLoaded', inizializzaFilm);
