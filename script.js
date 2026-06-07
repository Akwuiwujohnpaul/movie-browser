const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: "1,",
    totalPages: 1,
  },
};

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const main = document.querySelector(".main-body2");
    const a = document.createElement("a");
    a.className = "main-link";
    a.href = `tv-details.html?id=${movie.id}`;
    const div = document.createElement("div");
    div.className = "movie-body";
    const img = document.createElement("img");
    if (movie.poster_path) {
      img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    } else {
      img.src = "images/no-image.jpg";
    }
    const h3 = document.createElement("h3");
    h3.textContent = movie.original_title;
    const p = document.createElement("p");
    p.textContent = `Release = ${movie.release_date}`;

    main.append(a);
    a.append(div);
    div.append(img, h3, p);
  });
}

// Display popular shows
async function displayPopularShows() {
  const { results } = await fetchAPIData("discover/tv");
  results.forEach((show) => {
    const main = document.querySelector(".main-body2");
    const a = document.createElement("a");
    a.className = "main-link";
    a.href = `tv-shows.html?id=${show.id}`;
    const div = document.createElement("div");
    div.className = "movie-body";

    const img = document.createElement("img");
    if (show.poster_path) {
      img.src = `https://image.tmdb.org/t/p/w500/${show.poster_path}`;
    } else {
      img.src = "images/no-image.jpg";
    }
    const h3 = document.createElement("h3");
    h3.textContent = show.original_name;
    const p = document.createElement("p");
    p.textContent = `Release = ${show.first_air_date}`;

    main.append(a);
    a.append(div);
    div.append(img, h3, p);
  });
}

// Display movie details
async function displayMovieDetails() {
  const main = document.querySelector(".main-Tv_shows");
  const footer = document.querySelector(".lowerSection");
  const movieID = new URLSearchParams(window.location.search).get("id");

  //overlay for background image
  const movie = await fetchAPIData(`movie/${movieID}`);
  displayBackgroundImage("movie", movie.backdrop_path);

  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : "images/no-image.jpg";
  main.innerHTML = `
        <div class="container">
        <div class="tvShows-main">
          <div class="main-section-image">
            <div class="main-section-image">
              <img src="${imgSrc}" />
            </div>
          </div>
          <div class="main-section-text">
            <h2>${movie.original_title}</h2>
            <div class="rating">
              <i class="fa-solid fa-star"></i>
              <p>${movie.vote_average.toFixed(1)}</p>
            </div>
            <h3>Release Date: ${movie.release_date}</h3>
            <div class="movie-details">
              <p>${movie.overview}</p>
            </div>
            <div class="genre">
              <h3>Genres</h3>
              <ul class="genre-list">${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}</ul>
            </div>
            <button class="view">View Show Homepage</button>
          </div>
        </div>
      </div>
  `;

  footer.innerHTML = `
    <div class="container" >
      <h3>MOVIE INFO</h3>
      <div class="more-info">
          <p><span class="colouring" >Budget: </span>$${addCommas(movie.budget)}</p>
          <p> <span class="colouring" >Revenue: </span>$${addCommas(movie.revenue)}</p>
          <p> <span class="colouring" >Runtime: </span>${movie.runtime} minutes</p>
          <p> <span class="colouring" >Status: </span>${movie.status}</p>
      </div>
      <h4>Production Companies</h3>
      <p>${movie.production_companies.map((companies) => `<li>${companies.name}</li>`).join("")}</p>
  </div>
  `;
}

// Display show details
async function displayshowDetails() {
  const main = document.querySelector(".main-Tv_shows");
  const footer = document.querySelector(".lowerSection");
  console.log(window.location.search);
  const showID = new URLSearchParams(window.location.search).get("id");

  //overlay for background image
  const show = await fetchAPIData(`tv/${showID}`);
  displayBackgroundImage("tv", show.backdrop_path);

  const imgSrc = show.poster_path
    ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
    : "images/no-image.jpg";
  main.innerHTML = `
        <div class="container">
        <div class="tvShows-main">
          <div class="main-section-image">
            <div class="main-section-image">
              <img src="${imgSrc}" />
            </div>
          </div>
          <div class="main-section-text">
            <h2>${show.name}</h2>
            <div class="rating">
              <i class="fa-solid fa-star"></i>
              <p>${show.vote_average.toFixed(1)}</p>
            </div>
            <h3>Release Date: ${show.first_air_date}</h3>
            <div class="movie-details">
              <p>${show.overview}</p>
            </div>
            <div class="genre">
              <h3>Genres</h3>
              <ul class="genre-list">${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}</ul>
            </div>
            <button class="view">View Show Homepage</button>
          </div>
        </div>
      </div>
  `;

  footer.innerHTML = `
    <div class="container" >
      <h3>MOVIE INFO</h3>
      <div class="more-info">
          <p><span class="colouring" >No of Episodes:</span>${show.number_of_episodes}</p>
          <p> <span class="colouring" >Last Episode to Air: <p>Season: ${show.last_episode_to_air.season_number} Episode: ${show.last_episode_to_air.episode_number}</p> 
          <p> <span class="colouring" >Status: </span>${show.status}</p>
      </div>
      <h4>Production Companies</h3>
      <p>${show.production_companies.map((companies) => `<li>${companies.name}</li>`).join("")}</p>
  </div>
  `;
}

// Display slider movies
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    const div = document.createElement("div");
    const div2 = document.querySelector(".swiper-wrapper");
    const div3 = document.querySelector(".swiper");
    div.className = "swiper-slide";
    div.innerHTML = `
      <a href="tv-details.html?id=${movie.id}">
        <img class="swiper-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
      </a>
      <h4 class="swiper-rating" >
        <i class="fa-solid fa-star"></i>
        <span class="rating">${movie.vote_average}</span>
      </h4>`;
    div2.append(div);
    div3.append(div2);

    initSwipper();
  });
}

function initSwipper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    freeMode: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 4000,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch Data from API
async function fetchAPIData(endpoint) {
  const API_KEY = "b5f08f86f270936a7a994e303cf666c7";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

// Fetch Search Data from API
async function searchAPIData() {
  const API_KEY = "b5f08f86f270936a7a994e303cf666c7";
  const API_URL = "https://api.themoviedb.org/3/";

  showSpinner();

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`,
  );
  const { results, total_pages, page } = await response.json();

  if (results.length === 0) {
    showAlert("No result found", "alert-error");
    return;
  }

  displaySearchResult(results);
  document.querySelector('input[name="search-term"]').value = "";

  hideSpinner();
}

//Display search result
async function displaySearchResult(result) {
  result.forEach((search) => {
    const main = document.querySelector(".main-body2");
    const a = document.createElement("a");
    a.className = "main-link";
    a.href =
      global.search.type === "movie"
        ? `tv-details.html?id=${search.id}`
        : `tv-shows.html?id=${search.id}`;
    const div = document.createElement("div");
    div.className = "movie-body";

    const img = document.createElement("img");
    if (search.poster_path) {
      img.src = `https://image.tmdb.org/t/p/w500/${search.poster_path}`;
    } else {
      img.src = "images/no-image.jpg";
    }
    const h3 = document.createElement("h3");
    h3.textContent =
      global.search.type === "movie" ? search.title : search.name;
    const p = document.createElement("p");
    p.textContent = `Release: 
      ${
        global.search.type === "movie"
          ? search.release_date
          : search.first_air_date
      }`;

    main.append(a);
    a.append(div);
    div.append(img, h3, p);
  });
}

// Search API Data
async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.term = urlParams.get("search-term");
  global.search.type = urlParams.get("type");

  if (global.search.term) {
    await searchAPIData();
  }

  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      const input = document
        .querySelector('input[name="search-term"]')
        .value.trim();
      const type = document.querySelector('input[name="type"]').value;
      if (!input) {
        e.preventDefault();
        showAlert("Please enter a movie title", "alert-error");
      } else {
        global.search.term = input;
        global.search.type = type;
      }
    });
  }
}

// show alert
function showAlert(message, className) {
  const div = document.createElement("div");
  const alert = document.querySelector(".alertContainer");
  div.classList.add("alert", className);
  div.textContent = message;
  console.log(alert);
  alert.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

// Init App
function init() {
  console.log(global.currentPage);
  if (global.currentPage == "/index.html") {
    displayPopularMovies();
    displaySlider();
    search();
  } else if (global.currentPage === "/search.html") {
    search();
  } else if (global.currentPage === "/shows.html") {
    displayPopularShows();
  } else if (global.currentPage === "/tv-details.html") {
    displayMovieDetails();
  } else if (global.currentPage === "/tv-shows.html") {
    displayshowDetails();
  }
  highlightActiveLink();
}

// Highlight active link
function highlightActiveLink() {
  const home = document.querySelector(".home");
  const movies = document.querySelector(".movies");
  const tv_details = document.querySelector(".shows");

  if (global.currentPage === "/index.html") {
    home.style.color = "#ffc107";
  } else if (global.currentPage === "/shows.html") {
    movies.style.color = "#ffc107";
  } else if (global.currentPage === "/tv-details.html") {
    tv_details.style.color = "#ffc107";
  } else if (global.currentPage === "/tv-shows.html") {
    tv_details.style.color = "#ffc107";
  }
}

//Hide and remove spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("loading");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("loading");
}

document.addEventListener("DOMContentLoaded", init);

function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Display backdrop on details page
function displayBackgroundImage(type, backdrop_path) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";

  document.body.appendChild(overlayDiv);
}
