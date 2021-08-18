// import your pages
import LoginPage from "./pages/login.js";
import HomePage from "./pages/home.js";
import PersonsPage from "./pages/persons.js";
import MoviePage from "./pages/movies.js";
import ProfilePage from "./pages/profile.js";

// import your services
import spaService from "./services/spa.js";
import authService from "./services/auth.js";
import FavoritesPage from "./pages/favorites.js";

// Declare and init pages
let loginPage = new LoginPage();
let homePage = new HomePage();
let personsPage = new PersonsPage();
let moviePage = new MoviePage();
let favorites = new FavoritesPage();
let profilePage = new ProfilePage();

// init services 
spaService.init();
authService.init();

// onclick handlers
window.pageChange = () => spaService.pageChange();
window.logout = () => profilePage.logout();
window.updateUser = () => profilePage.updateUser();
window.previewImage = (file, previewId) => profilePage.previewImage(file, previewId);
window.addToFavourites = (movieId) => moviePage.addToFavourites(movieId);
window.removeFromFavourites = (movieId) => moviePage.removeFromFavourites(movieId);