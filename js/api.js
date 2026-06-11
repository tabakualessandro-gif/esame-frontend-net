// ACCESS_TOKEN viene da config.js
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w300';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
    }
};

async function fetchFromTMDB(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?language=it-IT`, options);
        if (!response.ok) {
            throw new Error('Errore ' + response.status);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Fetch fallita per ' + endpoint, error);
        return null;
    }
}

async function fetchDetailFromTMDB(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?language=it-IT`, options);
        if (!response.ok) {
            throw new Error('Errore ' + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error('Errore nel dettaglio:', error);
        return null;
    }
}
