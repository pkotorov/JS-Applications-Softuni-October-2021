import { allGamesTemplate } from "./allGamesTemplate.js";

let _render = undefined;
let _gameService = undefined;

function initialize(render, gameService) {
    _render = render;
    _gameService = gameService;
}

async function getView() {
    let games = await _gameService.getAllGames();

    let templateResult = allGamesTemplate(games);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}