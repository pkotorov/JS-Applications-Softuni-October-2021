import { createTemplate } from "./createTemplate.js";

let _render = undefined;
let _albumsService = undefined;

function initialize(render, albumsService) {
    _render = render;
    _albumsService = albumsService;
}

async function getView(ctx) {
    async function submitHandler(e) {
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
                let newAlbum = {
                    name: name,
                    imgUrl: imgUrl,
                    price: price,
                    releaseDate: releaseDate,
                    artist: artist,
                    genre: genre,
                    description: description
                };

                let createRes = await _albumsService.create(newAlbum);

                ctx.page.redirect("/catalog");
            }
    }

    let form = {
        submitHandler: submitHandler
    };

    let templateResult = createTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}