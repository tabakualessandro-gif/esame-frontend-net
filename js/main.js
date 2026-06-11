async function inizializzaHome() {
    showLoading('grid-trending-film');
    showLoading('grid-trending-serie');

    const [trendingFilm, trendingSerie] = await Promise.all([
        fetchFromTMDB('/trending/movie/day'),
        fetchFromTMDB('/trending/tv/day')
    ]);

    renderGrid('grid-trending-film', trendingFilm);
    renderGrid('grid-trending-serie', trendingSerie);
}

document.addEventListener('DOMContentLoaded', inizializzaHome);
