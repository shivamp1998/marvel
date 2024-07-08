const getSuperHeroById = async (id) => {
    try {
        const data = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${id}?ts=${Date.now()}&apikey=89a4d3534113fcf6d5a34545ad251c89&hash=${MD5(Date.now() + "7fca11a1b47732249481a6c7d045e9fec31f5d2a" + "89a4d3534113fcf6d5a34545ad251c89")}`);
        const response = await data.json();
        return response?.data?.results[0] || null;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const displaySuperHeroDetails = (character) => {
    if (character) {
        document.getElementById('heroImage').src = `${character.thumbnail.path}.${character.thumbnail.extension}`;
        document.getElementById('heroName').innerText = character.name;
        document.getElementById('heroDescription').innerText = character.description || 'Description not available';

        const comicsList = document.getElementById('comicsList');
        const seriesList = document.getElementById('seriesList');
        const storiesList = document.getElementById('storiesList');
        const eventsList = document.getElementById('eventsList');

        comicsList.innerHTML = character.comics.items.length > 0 ? 
            character.comics.items.map(item => `<li>${item.name}</li>`).join('') : 
            '<p class="empty-section">No comics available.</p>';

        seriesList.innerHTML = character.series.items.length > 0 ? 
            character.series.items.map(item => `<li>${item.name}</li>`).join('') : 
            '<p class="empty-section">No series available.</p>';

        storiesList.innerHTML = character.stories.items.length > 0 ? 
            character.stories.items.map(item => `<li>${item.name}</li>`).join('') : 
            '<p class="empty-section">No stories available.</p>';

        eventsList.innerHTML = character.events.items.length > 0 ? 
            character.events.items.map(item => `<li>${item.name}</li>`).join('') : 
            '<p class="empty-section">No events available.</p>';
    } else {
        document.getElementById('superheroDetails').innerHTML = '<p>Superhero details not found.</p>';
    }
}

const setupTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.getAttribute('data-tab')).classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const superheroId = urlParams.get('id');
    if (superheroId) {
        const character = await getSuperHeroById(superheroId);
        displaySuperHeroDetails(character);
        setupTabs();
    }
});
