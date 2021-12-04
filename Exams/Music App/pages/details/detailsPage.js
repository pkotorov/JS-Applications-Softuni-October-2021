import { detailsTemplate } from "./detailsTemplate.js";

let _render = undefined;
let _albumsService = undefined;
let _authService = undefined;

function initialize(render, albumsService, authService) {
    _render = render;
    _albumsService = albumsService;
    _authService = authService;
}

async function deleteAlbum(ctx, albumId) {
    let confirmed = confirm("Are you sure you want to delete the album?");

    if (confirmed) {
        let deleteRes = await _albumsService.deleteAlbum(albumId);

        ctx.page.redirect("/catalog");
    }
}

async function getView(ctx) {
    let albumId = ctx.params.id;

    let album = await _albumsService.getOne(albumId);

    let isOwner = _authService.getUserId() === album._ownerId;

    let boundDeleteClickHandler = deleteAlbum.bind(null, ctx, albumId);

    let templateResult = detailsTemplate(album, isOwner, boundDeleteClickHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}