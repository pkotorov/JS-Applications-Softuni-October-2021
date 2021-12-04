import { editTemplate } from "./editTemplate.js";


let _render = undefined;
let _gameService = undefined;

function initialize(render, gameService) {
    _render = render;
    _gameService = gameService;
}

async function formSubmit(gameId, ctx, e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let title = form.get("title");
    let category = form.get("category");
    let maxLevel = form.get("maxLevel");
    let imageUrl = form.get("imageUrl");
    let summary = form.get("summary");

    if (title.trim() !== ''
        && category.trim() !== ''
        && imageUrl.trim() !== ''
        && summary.trim() !== '') {
            let editGame = {
                title: title,
                category: category,
                maxLevel: maxLevel,
                imageUrl: imageUrl,
                summary: summary
            };

            let editRes = await _gameService.edit(gameId, editGame);

            ctx.page.redirect("/details/" + gameId);
        }
}

async function getView(ctx) {
    let gameId = ctx.params.id;

    let game = await _gameService.getOne(gameId);

    let boundEditHandler = formSubmit.bind(null, gameId, ctx);

    let form = {
        submitHandler: boundEditHandler,
        values: {
            title: game.title,
            category: game.category,
            maxLevel: game.maxLevel,
            imageUrl: game.imageUrl,
            summary: game.summary
        }
    };

    let templateResult = editTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}