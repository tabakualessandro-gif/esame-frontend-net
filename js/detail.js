const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';
const POSTER_DETAIL_BASE = 'https://image.tmdb.org/t/p/w500';

async function inizializzaDettaglio() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type');

    const main = document.getElementById('detail-main');

    if (!id || (type !== 'movie' && type !== 'tv')) {
        window.location.href = 'index.html';
        return;
    }

    const item = await fetchDetailFromTMDB('/' + type + '/' + id);

    if (!item) {
        main.innerHTML = '<p class="error-message" style="padding:48px 40px">Impossibile caricare i dettagli. Riprova più tardi.</p>';
        return;
    }

    mostraDettaglio(main, item, type);
}

function mostraDettaglio(main, item, type) {
    const title = item.title || item.name || 'Titolo sconosciuto';
    const date = item.release_date || item.first_air_date;
    const year = date ? date.split('-')[0] : 'N.D.';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N.D.';
    const overview = item.overview || 'Nessuna descrizione disponibile.';
    const tagline = item.tagline || '';

    const genres = item.genres ? item.genres.map(g => g.name).join(' · ') : '';

    let duration = '';
    if (type === 'movie' && item.runtime) {
        const ore = Math.floor(item.runtime / 60);
        const minuti = item.runtime % 60;
        duration = ore > 0 ? `${ore}h ${minuti}min` : `${minuti}min`;
    } else if (type === 'tv' && item.episode_run_time && item.episode_run_time.length > 0) {
        duration = `~${item.episode_run_time[0]} min / episodio`;
    }

    const backdropUrl = item.backdrop_path ? `${BACKDROP_BASE}${item.backdrop_path}` : '';

    let posterHtml;
    if (item.poster_path) {
        posterHtml = `<img class="detail-poster" src="${POSTER_DETAIL_BASE}${item.poster_path}" alt="${title}">`;
    } else {
        posterHtml = `<div class="detail-poster no-poster">Nessuna immagine</div>`;
    }

    document.title = title + ' — Netflix Clone';

    main.innerHTML = `
        ${backdropUrl ? `<div class="detail-backdrop" style="background-image:url('${backdropUrl}')"></div>` : '<div class="detail-backdrop-placeholder"></div>'}
        <div class="detail-content">
            <a href="javascript:history.back()" class="back-btn">&#8592; Torna indietro</a>
            <div class="detail-body">
                ${posterHtml}
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
