let characters = [];

const getSuperHeroes = async (searchString = '') => {
    try {
        const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchString}&ts=${Date.now()}&apikey=89a4d3534113fcf6d5a34545ad251c89&hash=${MD5(Date.now() + "7fca11a1b47732249481a6c7d045e9fec31f5d2a" + "89a4d3534113fcf6d5a34545ad251c89")}`);
        const response = await data.json();
        return response?.data?.results || [];
    } catch (err) {
        console.log(err);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const emptyMessage = document.getElementById('emptyMessage');
    const searchBar = document.getElementById('searchBar');
    const charactersContainer = document.getElementById('charactersContainer');

    const displayCharacters = (characters) => {
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
                    <a href="${character.urls[0].url}" target="_blank">More Details</a>
                </div>
            </div>
        `).join('');
    };

    const fetchAndDisplayCharacters = async (searchString) => {
        loader.style.display = 'block';
        charactersContainer.innerHTML = '';
        emptyMessage.style.display = 'none';
        const filteredCharacters = await getSuperHeroes(searchString);
        loader.style.display = 'none';
        displayCharacters(filteredCharacters);
    };
    

    //debouncing for efficient searches
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

    // Initial fetch and display of characters
    fetchAndDisplayCharacters('');
});
