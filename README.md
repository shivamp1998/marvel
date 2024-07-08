# Marvel Characters App

This Marvel Characters App allows users to search for Marvel superheroes, view detailed information about them, and add them to a list of favorites. The app is built with HTML, CSS, and JavaScript, and uses the Marvel API to fetch superhero data.

## Features

- **Home Page**
  - Fetch and display a list of superheroes.
  - Search for superheroes by name.
  - Add superheroes to a list of favorites.
  - View more details about a superhero by clicking on "More Details".

- **Superhero Page**
  - Display detailed information about a superhero, including comics, series, stories, and events.
  - Organized into tabs for easy navigation.

- **Favorites Page**
  - Display a list of favorite superheroes.
  - Remove superheroes from the list of favorites.
  - Persistent storage of favorite superheroes using `localStorage`.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/shivamp1998/marvel.git
    ```

2. Navigate to the project directory:
    ```sh
    cd marvel
    ```

3. Open the `index.html` file in your web browser.

## Usage

### Home Page

- **Search for Superheroes**: Use the search bar to find superheroes by name.
- **Add to Favorites**: Click the "Add to Favorites" button to add a superhero to your list of favorites.
- **View More Details**: Click the "More Details" link to view detailed information about a superhero.

### Superhero Page

- **View Details**: View detailed information about a superhero, including their comics, series, stories, and events, organized into tabs.

### Favorites Page

- **View Favorites**: View a list of your favorite superheroes.
- **Remove from Favorites**: Click the "Remove from Favorites" button to remove a superhero from your list of favorites.

### Description of Files

- **index.html**: The main page for displaying and searching Marvel characters.
- **favorites.html**: The page for displaying the list of favorite superheroes.
- **superhero.html**: The detail page for displaying detailed information about a superhero.
- **css/index.css**: The main CSS file containing styles for all pages.
- **js/md5.js**: The JavaScript file for generating MD5 hashes.
- **js/index.js**: The main JavaScript file for handling the home page functionalities.
- **js/superhero.js**: The JavaScript file for handling the superhero detail page functionalities.
- **js/favorites.js**: The JavaScript file for handling the favorites page functionalities.

## API Reference

This app uses the [Marvel API](https://developer.marvel.com/) to fetch data about superheroes.

- **Endpoint**: `https://gateway.marvel.com:443/v1/public/characters`
- **Parameters**:
  - `ts`: A timestamp (or other long string which can change on a request-by-request basis)
  - `apikey`: Your public API key
  - `hash`: An MD5 digest of the timestamp parameter, your private key, and your public key

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


