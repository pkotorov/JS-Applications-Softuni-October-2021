import { searchResultsTemplate, searchTemplate } from "./searchTemplate.js";

let _render = undefined;
let _albumsService = undefined;
let _authService = undefined;

function initialize(render, albumsService, authService) {
    _render = render;
    _albumsService = albumsService;
    _authService = authService;
}

async function search() {
    let albumName = document.querySelector("#search-input");
    let isLoggedIn = _authService.isLoggedIn();

    if (albumName.value.trim() === '') {
        alert("Name cannot be empty.")
    } else {
        let albums = await _albumsService.getAlbumsByName(albumName.value);

        albumName.value = '';

        let templateResult = searchResultsTemplate(albums, search, isLoggedIn);
        _render(templateResult);
    }
}

async function getView() {
    let boundClickHandler = search.bind(null);

    let templateResult = searchTemplate(boundClickHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}