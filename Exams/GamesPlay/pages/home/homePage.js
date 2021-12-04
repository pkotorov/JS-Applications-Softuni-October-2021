import { homeTemplate } from "./homeTemplate.js";

let _render = undefined;
let _gameService = undefined;

function initialize(render, gameService) {
    _render = render;
    _gameService = gameService;
}

async function getView() {
    let games = await _gameService.getAllGamesForHomePage();

    let templateResult = homeTemplate(games);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}