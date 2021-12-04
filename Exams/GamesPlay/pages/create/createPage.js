import { createTemplate } from "./createTemplate.js";

let _render = undefined;
let _gameService = undefined;

function initialize(render, gameService) {
    _render = render;
    _gameService = gameService;
}

async function getView(ctx) {
    async function submitHandler(e) {
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
                let newGame = {
                    title: title,
                    category: category,
                    maxLevel: maxLevel,
                    imageUrl: imageUrl,
                    summary: summary
                };

                let createRes = await _gameService.create(newGame);

                ctx.page.redirect("/");
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