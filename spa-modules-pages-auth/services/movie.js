import authService from "./auth.js";
import loaderService from "./loader.js";

class MovieService {
    constructor() {
        this.movieRef = _db.collection("movies");
    }
    init() {
        // init all movies
        this.movieRef.onSnapshot(snapshotData => {
            let movies = [];
            snapshotData.forEach(doc => {
                let movie = doc.data();
                movie.id = doc.id;
                movies.push(movie);
            });
            this.appendMovies(movies);

        });
        this.appendFavMovies();
    }

    appendMovies(movies) {
        let htmlTemplate = "";
        for (let movie of movies) {
            htmlTemplate += `
            <article>
              <h2>${movie.title} (${movie.year})</h2>
              <img src="${movie.img}">
              <p>${movie.description}</p>
              ${this.generateFavMovieButton(movie.id)}
            </article>
          `;
        }
        document.querySelector('#movie-container').innerHTML = htmlTemplate;
    }

    generateFavMovieButton(movieId) {
        let btnTemplate = `
          <button onclick="addToFavourites('${movieId}')">Add to favourites</button>`;
        if (this.userHasFav(movieId)) {
            btnTemplate = `
            <button onclick="removeFromFavourites('${movieId}')" class="rm">Remove from favourites</button>`;
        }
        return btnTemplate;
    }

    userHasFav(favMovieId) {
        if (authService.authUser.favMovies && authService.authUser.favMovies.includes(favMovieId)) {
            return true;
        } else {
            return false;
        }
    }

    // adds a given movieId to the favMovies array inside _currentUser
    addToFavourites(movieId) {
        loaderService.show(true);
        authService.authUserRef.set({
            favMovies: firebase.firestore.FieldValue.arrayUnion(movieId)
        }, {
            merge: true
        });
    }

    // removes a given movieId to the favMovies array inside _currentUser
    removeFromFavourites(movieId) {
        loaderService.show(true);
        authService.authUserRef.update({
            favMovies: firebase.firestore.FieldValue.arrayRemove(movieId)
        });
    }

    async getFavMovies() {
        let favMovies = [];
        if (authService.authUser.favMovies) {
            for (let movieId of authService.authUser.favMovies) {
                await this.movieRef.doc(movieId).get().then(function (doc) {
                    let movie = doc.data();
                    movie.id = doc.id;;
                    favMovies.push(movie);
                });
            }
        }
        return favMovies;
    }

    async appendFavMovies() {
        let movies = await movieService.getFavMovies();
        let template = "";
        for (let movie of movies) {
            template += /* html */ `
            <article>
              <h2>${movie.title} (${movie.year})</h2>
              <img src="${movie.img}">
              <p>${movie.description}</p>
              <button onclick="removeFromFavourites('${movie.id}')" class="rm">Remove from favourites</button>
            </article>
          `;
        }
        if (movies.length === 0) {
            template = `
                <p>No movies added</p>
            `;
        }
        document.querySelector('#fav-movie-container').innerHTML = template;
    }
}

const movieService = new MovieService();
export default movieService;