async function inizializzaSerie() {
    showLoading('grid-on-the-air');
    showLoading('grid-serie-popolari');
    showLoading('grid-serie-top');

    const [onTheAir, popolari, topRated] = await Promise.all([
        fetchFromTMDB('/tv/on_the_air'),
        fetchFromTMDB('/tv/popular'),
        fetchFromTMDB('/tv/top_rated')
    ]);

    renderGrid('grid-on-the-air', onTheAir);
    renderGrid('grid-serie-popolari', popolari);
    renderGrid('grid-serie-top', topRated);
}

document.addEventListener('DOMContentLoaded', inizializzaSerie);
