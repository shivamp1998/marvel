let characters = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const getSuperHeroes = async (searchString = '') => {
    try {
        const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchString}&ts=${Date.now()}&apikey=89a4d3534113fcf6d5a34545ad251c89&hash=${MD5(Date.now() + "7fca11a1b47732249481a6c7d045e9fec31f5d2a" + "89a4d3534113fcf6d5a34545ad251c89")}`);
        const response = await data.json();
        characters = response?.data?.results
        return response?.data?.results || [];
    } catch (err) {
        console.log(err);
        return [];
    }
}

const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const addFavorite = (character) => {
    if (!favorites.some(fav => fav?.id === character?.id)) {
        favorites.push(character);
        saveFavorites();
    }
}

const removeFavorite = (characterId) => {
    favorites = favorites.filter(fav => fav?.id !== characterId);
    saveFavorites();
}

const isFavorite = (characterId) => {
    return favorites.some(fav => fav?.id === characterId);
}

const displayCharacters = (characters) => {
    const charactersContainer = document.getElementById('charactersContainer');
    const emptyMessage = document.getElementById('emptyMessage');

    if (characters.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }

    charactersContainer.innerHTML = characters.map(character => `
        <div class="card">
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
            <div class="card-content">
                <h2>${character.name}</h2>
                <p>${character.description || 'Description not available'}</p>
                <button class="favorite-btn" onclick="toggleFavorite(${character.id})">
                    ${isFavorite(character.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <a href="superhero.html?id=${character.id}">More Details</a>
            </div>
        </div>
    `).join('');
};

const fetchAndDisplayCharacters = async (searchString) => {
    const loader = document.getElementById('loader');
    const charactersContainer = document.getElementById('charactersContainer');
    const emptyMessage = document.getElementById('emptyMessage');

    loader.style.display = 'block';
    charactersContainer.innerHTML = '';
    emptyMessage.style.display = 'none';
    const filteredCharacters = await getSuperHeroes(searchString);
    loader.style.display = 'none';
    displayCharacters(filteredCharacters);
};

const toggleFavorite = (characterId) => {
    const character = characters.find(char => char.id === characterId);
    if (isFavorite(characterId)) {
        removeFavorite(characterId);
    } else {
        addFavorite(character);
    }
    displayCharacters(characters);
}

document.addEventListener('DOMContentLoaded', async () => {
    const searchBar = document.getElementById('searchBar');

    let searchString = ""
    let timer = null
    searchBar.addEventListener('keyup', (e) => {
        searchString = e.target.value.toLowerCase();
        clearTimeout(timer)
        timer = setTimeout(() => {
            fetchAndDisplayCharacters(searchString);
            clearTimeout(timer)
        }, 1000)
    });

    fetchAndDisplayCharacters('');
});
