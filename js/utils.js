/**
 * Restituisce il titolo dell'elemento (film o serie TV).
 */
function getTitle(item) {
    return item.title || item.name || 'Titolo sconosciuto';
}

/**
 * Estrae l'anno dalla data di uscita (film) o prima messa in onda (serie).
 */
function formatYear(item) {
    const date = item.release_date || item.first_air_date;
    return date ? date.split('-')[0] : 'N.D.';
}

/**
 * Crea e restituisce una card DOM per un film o una serie TV.
 */
function createCard(item) {
    const title = getTitle(item);
    const year = formatYear(item);
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N.D.';
    const mediaType = item.media_type || (item.title !== undefined ? 'movie' : 'tv');

    const posterHtml = item.poster_path
        ? `<img src="${BASE_IMG_URL}${item.poster_path}" alt="${title}" loading="lazy">`
        : `<div class="no-poster">Nessuna immagine</div>`;

    const card = document.createElement('div');
    card.className = 'movie-card';
    card.addEventListener('click', () => {
        window.location.href = `detail.html?id=${item.id}&type=${mediaType}`;
    });
    card.innerHTML = `
        <div class="poster-wrapper">
            ${posterHtml}
        </div>
        <div class="card-details">
            <h3 title="${title}">${title}</h3>
            <div class="meta-info">
                <span class="year">${year}</span>
                <span class="rating">&#9733; ${rating}</span>
            </div>
        </div>
    `;
    return card;
}

/**
 * Svuota il contenitore e popola la griglia con le card degli elementi.
 */
function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (items === null) {
        container.innerHTML = '<p class="error-message">Errore nel caricamento. Controlla la connessione o la API key e riprova.</p>';
        return;
    }

    if (items.length === 0) {
        container.innerHTML = '<p class="error-message">Nessun contenuto disponibile.</p>';
        return;
    }

    items
        .map(item => createCard(item))
        .forEach(card => container.appendChild(card));
}

/**
 * Mostra un messaggio di caricamento nel contenitore.
 */
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<p class="loading-message">Caricamento in corso...</p>';
    }
}
