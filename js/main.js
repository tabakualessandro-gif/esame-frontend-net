async function inizializzaHome() {
    showLoading('grid-trending-film');
    showLoading('grid-trending-serie');

    const [trendingFilm, trendingSerie] = await Promise.all([
        fetchFromTMDB('/trending/movie/week'),
        fetchFromTMDB('/trending/tv/week')
    ]);

    renderGrid('grid-trending-film', trendingFilm);
    renderGrid('grid-trending-serie', trendingSerie);
}

document.addEventListener('DOMContentLoaded', inizializzaHome);
