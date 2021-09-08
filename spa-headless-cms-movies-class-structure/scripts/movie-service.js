import Loader from "./loader.js";

class MovieService {

  constructor() {
    this.movies = [];
    this.categories = [];
    this.loader = new Loader();
  }

  init() {
    this.getMovies();
    this.getCategories();
    this.loader.show(false);
  }

  async getMovies() {
    let data = await fetch('https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed').then(res => res.json());
    console.log(data);
    this.movies = data;
    this.appendMovies(this.movies);
  }

  async getCategories() {
    let data = await fetch('https://movie-api.cederdorff.com/wp-json/wp/v2/categories').then(res => res.json());
    console.log(data);
    this.categories = data;
    this.appendCategories();
  }

  async getMoviesByCategory(categoryId) {
    this.loader.show(true);
    console.log(categoryId);
    let data = await fetch(`https://movie-api.cederdorff.com/wp-json/wp/v2/posts?_embed&categories=${categoryId}`).then(res => res.json());
    this.appendMoviesByCategory(data);
    this.loader.show(false);
  }

  appendMovies(movies) {
    let htmlTemplate = "";
    for (let movie of movies) {
      htmlTemplate += /*html*/ `
        <article>
            <h2>${movie.title.rendered} (${movie.acf.year})</h2>
            <img src="${this.getFeaturedImageUrl(movie)}">
            <p>${movie.excerpt.rendered}</p>
        </article>
    `;
    }
    document.querySelector('#movies-container').innerHTML = htmlTemplate;
  }

  appendCategories() {
    let htmlTemplate = "";
    for (let category of this.categories) {
      htmlTemplate += /*html*/`
        <option value="${category.id}">${category.name}</option>
      `;
    }

    document.querySelector('#select-category').innerHTML += htmlTemplate;
  }

  appendMoviesByCategory(movies) {
    let htmlTemplate = "";
    for (let movie of movies) {
      htmlTemplate += /*html*/ `
        <article>
            <h2>${movie.title.rendered} (${movie.acf.year})</h2>
            <img src="${this.getFeaturedImageUrl(movie)}">
            <p>${movie.excerpt.rendered}</p>
        </article>
    `;
    }
    // if no movies, display feedback to the user
    if (movies.length === 0) {
      htmlTemplate = /*html*/`
        <p>No Movies</p>
      `;
    }

    document.querySelector('#movies-by-category-container').innerHTML = htmlTemplate;
  }

  getFeaturedImageUrl(post) {
    let imageUrl = "";
    if (post._embedded['wp:featuredmedia']) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
    }
    return imageUrl;
  }

  search(value) {
    let searchValue = value.toLowerCase();
    let filteredMovies = this.movies.filter(movie => movie.title.rendered.toLowerCase().includes(searchValue));
    this.appendMovies(filteredMovies);
  }
}

export default MovieService;