async function inizializzaSerie() {
    showLoading('grid-on-the-air');
    showLoading('grid-serie-popolari');
    showLoading('grid-serie-top');

    const onTheAir = await fetchFromTMDB('/tv/on_the_air');
    const popolari = await fetchFromTMDB('/tv/popular');
    const topRated = await fetchFromTMDB('/tv/top_rated');

    renderGrid('grid-on-the-air', onTheAir);
    renderGrid('grid-serie-popolari', popolari);
    renderGrid('grid-serie-top', topRated);
}

document.addEventListener('DOMContentLoaded', inizializzaSerie);
