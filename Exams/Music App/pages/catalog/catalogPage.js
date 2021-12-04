import { catalogTemplate } from "./catalogTemplate.js";


let _render = undefined;
let _albumsService = undefined;
let _authService = undefined;

function initialize(render, albumsService, authService) {
    _render = render;
    _albumsService = albumsService;
    _authService = authService;
}

async function getView() {
    let albums = await _albumsService.getAllAlbums();

    let isLoggedIn = _authService.isLoggedIn();

    let templateResult = catalogTemplate(albums, isLoggedIn);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}