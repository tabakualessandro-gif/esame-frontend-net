async function inizializzaHome() {
    showLoading('grid-trending-film');
    showLoading('grid-trending-serie');

    const trendingFilm = await fetchFromTMDB('/trending/movie/day');
    const trendingSerie = await fetchFromTMDB('/trending/tv/day');

    renderGrid('grid-trending-film', trendingFilm);
    renderGrid('grid-trending-serie', trendingSerie);
}

document.addEventListener('DOMContentLoaded', inizializzaHome);
