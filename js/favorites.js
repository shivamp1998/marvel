let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const displayFavorites = () => {
    const favoritesContainer = document.getElementById('favoritesContainer');
    if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p class="empty-message">No favorite superheroes found.</p>';
    } else {
        favoritesContainer.innerHTML = favorites.map(character => `
            <div class="card">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}" alt="${character.name}">
                <div class="card-content">
                    <h2>${character.name}</h2>
                    <p>${character.description || 'Description not available'}</p>
                    <button class="favorite-btn" onclick="removeFavorite(${character.id})">Remove from Favorites</button>
                    <a href="superhero.html?id=${character.id}" target="_blank">More Details</a>
                </div>
            </div>
        `).join('');
    }
}

const removeFavorite = (characterId) => {
    favorites = favorites.filter(fav => fav.id !== characterId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

document.addEventListener('DOMContentLoaded', displayFavorites);
