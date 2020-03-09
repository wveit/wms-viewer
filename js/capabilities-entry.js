
//////////////////////////////////////////////
//
//          Favorites
//
//////////////////////////////////////////////
const favoriteCapabilitiesUrlList = document.getElementById("favorite-capabilities-url-list");

function addFavorite(url) {
    addFavoriteLi(url);

    let favorites = getFavorites();
    favorites.push(url);
    setFavorites(favorites);
}

function addFavoriteLi(url) {
    const favoriteLi = document.createElement("li");
    favoriteLi.innerHTML = `<p>${url}</p>`;
    favoriteLi.setAttribute("data-url", url);
    const loadButton = document.createElement("button");
    loadButton.onclick = handleLoadFavorite;
    loadButton.innerHTML = "Load Capabilities";
    favoriteLi.appendChild(loadButton);
    const removeButton = document.createElement("button");
    removeButton.onclick = handleRemoveFavorite;
    removeButton.innerHTML = "Remove";
    favoriteLi.appendChild(removeButton);
    favoriteCapabilitiesUrlList.appendChild(favoriteLi);
}

function handleLoadFavorite(event) {
    const url = event.target.parentElement.getAttribute("data-url");
    loadCapabilities(url);
}

function handleRemoveFavorite(event) {
    const favoriteLi = event.target.parentElement;
    const url = favoriteLi.getAttribute("data-url");
    favoriteCapabilitiesUrlList.removeChild(favoriteLi);

    let favorites = getFavorites();
    favorites = favorites.filter(value => value !== url);
    setFavorites(favorites);
}

function getFavorites() {
    let favorites = window.localStorage.getItem("favorites");
    try {
        while(typeof favorites === "string")
            favorites = JSON.parse(favorites);
    }
    catch {

    }
    if(!Array.isArray(favorites)) {
        favorites = [];
    }
    return favorites;
}

function setFavorites(favorites) {
    let favoritesString = JSON.stringify(favorites);
    window.localStorage.setItem("favorites", favoritesString);
}

const favorites = getFavorites();
favorites.forEach(url => addFavoriteLi(url));





//////////////////////////////////////////////
//
//          Capabilities Mode Selection
//
//////////////////////////////////////////////
const capabilitiesEntryRadioButton = document.getElementById("capabilities-entry-radio-button");
const favoriteCapabilitiesRadioButton = document.getElementById("favorite-capabilities-radio-button");
capabilitiesEntryRadioButton.onclick = radioClickHandler;
favoriteCapabilitiesRadioButton.onclick = radioClickHandler;

const capabilitiesEntryView = document.getElementById("capabilities-entry-view");
const favoriteCapabilitiesView = document.getElementById("favorite-capabilities-view");

function radioClickHandler(event) {
    handleRadioClick(event.target.value);
}

function handleRadioClick(value) {
    capabilitiesEntryView.classList.remove("display-none");
    favoriteCapabilitiesView.classList.remove("display-none");

    if(value === "favorite-capabilities") {
        capabilitiesEntryView.classList.add("display-none");
    }
    else {
        favoriteCapabilitiesView.classList.add("display-none");
    }
}

if(capabilitiesEntryRadioButton.checked) {
    handleRadioClick("enter-capabilities");
}
else {
    handleRadioClick("favorite-capabilities");
}

//////////////////////////////////////////////
//
//          Capabilities Mode Entry
//
//////////////////////////////////////////////
const capabilitiesUrlInput = document.getElementById("capabilities-url-input");
const capabilitiesEntryLoadButton = document.getElementById("capabilities-entry-load-button");
const capabilitiesEntryAddFavoriteButton = document.getElementById("capabilities-entry-add-favorite-button");

capabilitiesEntryAddFavoriteButton.onclick = function() {
    addFavorite(capabilitiesUrlInput.value);
}

capabilitiesEntryLoadButton.onclick = function() {
    const url = capabilitiesUrlInput.value;
    loadCapabilities(url);
}


//////////////////////////////////////////////
//
//          Callbacks
//
//////////////////////////////////////////////

const callbacks = [];

function loadCapabilities(url) {
    callbacks.forEach(callback => callback(url));
}


export function registerCallback(callback) {
    callbacks.push(callback);
}
