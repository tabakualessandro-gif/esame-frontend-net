// ACCESS_TOKEN è definito in js/config.js (escluso da Git)
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w300';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
};

/**
 * Funzione generica e asincrona per recuperare i film da un endpoint specifico
 * @param {string} endpoint
 * @returns {Promise<Array>}
 */
async function fetchFromTMDB(endpoint) {
    try {
        
        const response = await fetch(`${BASE_URL}${endpoint}?language=it-IT`, options);
        
        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
        
        const data = await response.json();
        
        
        return data.results;
    } catch (error) {
        console.error(`Errore nel fetch dell'endpoint ${endpoint}:`, error);
        return null;
    }
}

/**
 * Recupera il dettaglio di un singolo film o serie TV (risposta oggetto, non array).
 * @param {string} endpoint  es. /movie/123 oppure /tv/456
 * @returns {Promise<Object|null>}
 */
async function fetchDetailFromTMDB(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?language=it-IT`, options);
        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Errore nel fetch del dettaglio ${endpoint}:`, error);
        return null;
    }
}