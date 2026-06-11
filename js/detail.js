const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';
const POSTER_DETAIL_BASE = 'https://image.tmdb.org/t/p/w342';

async function inizializzaDettaglio() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type');

    const main = document.getElementById('detail-main');

    if (!id || (type !== 'movie' && type !== 'tv')) {
        window.location.href = 'index.html';
        return;
    }

    const item = await fetchDetailFromTMDB(`/${type}/${id}`);

    if (!item) {
        main.innerHTML = '<p class="error-message" style="padding:48px 40px">Impossibile caricare i dettagli. Riprova più tardi.</p>';
        return;
    }

    renderDettaglio(main, item, type);
}

function renderDettaglio(main, item, type) {
    const title = item.title || item.name || 'Titolo sconosciuto';
    const date = item.release_date || item.first_air_date;
    const year = date ? date.split('-')[0] : 'N.D.';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N.D.';
    const overview = item.overview || 'Nessuna descrizione disponibile.';
    const tagline = item.tagline || '';
    const genres = item.genres ? item.genres.map(g => g.name).join(' · ') : '';

    let duration = '';
    if (type === 'movie' && item.runtime) {
        const h = Math.floor(item.runtime / 60);
        const m = item.runtime % 60;
        duration = h > 0 ? `${h}h ${m}min` : `${m}min`;
    } else if (type === 'tv' && item.episode_run_time && item.episode_run_time.length > 0) {
        duration = `~${item.episode_run_time[0]} min / episodio`;
    }

    const backdropUrl = item.backdrop_path ? `${BACKDROP_BASE}${item.backdrop_path}` : '';
    const posterUrl = item.poster_path
        ? `${POSTER_DETAIL_BASE}${item.poster_path}`
        : 'https://placehold.co/220x330/1f1f1f/666?text=No+Image';

    document.title = `${title} — Netflix Clone`;

    main.innerHTML = `
        ${backdropUrl ? `<div class="detail-backdrop" style="background-image:url('${backdropUrl}')"></div>` : '<div class="detail-backdrop-placeholder"></div>'}
        <div class="detail-content">
            <a href="javascript:history.back()" class="back-btn">&#8592; Torna indietro</a>
            <div class="detail-body">
                <img class="detail-poster" src="${posterUrl}" alt="${title}">
                <div class="detail-info">
                    <h1 class="detail-title">${title}</h1>
                    ${tagline ? `<p class="detail-tagline">${tagline}</p>` : ''}
                    <div class="detail-meta">
                        <span>${year}</span>
                        ${duration ? `<span>${duration}</span>` : ''}
                        <span class="detail-rating">&#9733; ${rating}</span>
                    </div>
                    ${genres ? `<p class="detail-genres">${genres}</p>` : ''}
                    <p class="detail-overview">${overview}</p>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', inizializzaDettaglio);
