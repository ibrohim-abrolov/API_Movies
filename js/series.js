const elList = document.querySelector(".movies-list");
const elForm = document.querySelector(".js-form");
const elSearchInput = document.querySelector(".js-search-input");
const moviesFragment = document.createDocumentFragment();
const API_KEY = "3289aa71";

function renderMovies(arr, node) {
    elList.innerHTML = "";
    arr.forEach(item => {
        // Creating DOM elements
        const movieItem = document.createElement("li");
        const movieImg = document.createElement("img");
        const movieTitle = document.createElement("h3");
        const movieType = document.createElement("p");
        const movieLinkWrapper = document.createElement("div");
        const movieLink = document.createElement("a");

        //Adding classlist
        elList.classList.add("movies-list");
        movieItem.classList.add("movies-items", "shadow");
        movieImg.classList.add("movies-img");
        movieTitle.classList.add("movies-title");
        movieType.classList.add("movies-type");
        movieLinkWrapper.classList.add("movies-link-wrapper");
        movieLink.classList.add("movies-link", "border-primary");

        // TextContent
        movieImg.src = item.Poster;
        movieImg.alt = item.Title;
        movieTitle.textContent = item.Title;
        movieType.textContent = `Type: ${item.Type}`;
        movieLink.textContent = "Watch now";
        movieLink.href = `https://www.imdb.com/title/${item.imdbID}`;
        movieLink.setAttribute("target", "blank");

        // Appending elements
        movieLinkWrapper.appendChild(movieLink);
        movieItem.append(movieImg, movieTitle, movieType, movieLinkWrapper);
        moviesFragment.appendChild(movieItem);
    });
    node.appendChild(moviesFragment);
};

function getMoviesData(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        renderMovies(data.Search, elList);
    })
    .catch(err => console.log(err))
};

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const searchInputValue = elSearchInput.value.trim().toLowerCase();
    
    getMoviesData(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInputValue}&type=series`);
});