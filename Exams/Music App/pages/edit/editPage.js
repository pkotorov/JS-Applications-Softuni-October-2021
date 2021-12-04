import { editTemplate } from "./editTemplate.js";


let _render = undefined;
let _albumsService = undefined;

function initialize(render, albumsService) {
    _render = render;
    _albumsService = albumsService;
}

async function formSubmit(albumId, ctx, e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let name = form.get("name");
        let imgUrl = form.get("imgUrl");
        let price = form.get("price");
        let releaseDate = form.get("releaseDate");
        let artist = form.get("artist");
        let genre = form.get("genre");
        let description = form.get("description");

        if (name.trim() !== ''
            && imgUrl.trim() !== ''
            && price.trim() !== ''
            && releaseDate.trim() !== ''
            && artist.trim() !== ''
            && genre.trim() !== ''
            && description.trim() !== '') {
            let editAlbum = {
                name: name,
                imgUrl: imgUrl,
                price: price,
                releaseDate: releaseDate,
                artist: artist,
                genre: genre,
                description: description
            };

            let editRes = await _albumsService.edit(albumId, editAlbum);

            ctx.page.redirect("/details/" + albumId);
        }
}

async function getView(ctx) {
    let albumId = ctx.params.id;

    let album = await _albumsService.getOne(albumId);

    let boundEditHandler = formSubmit.bind(null, albumId, ctx);

    let form = {
        submitHandler: boundEditHandler,
        values: {
            name: album.name,
            imgUrl: album.imgUrl,
            description: album.description,
            price: album.price,
            releaseDate: album.releaseDate,
            artist: album.artist,
            genre: album.genre,
        }
    };

    let templateResult = editTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}