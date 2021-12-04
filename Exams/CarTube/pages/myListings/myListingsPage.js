import { myListingsTemplate } from "./myListingsTemplate.js";

let _render = undefined;
let _carsService = undefined;
let _authService = undefined;

function initialize(render, carsService, authService) {
    _render = render;
    _carsService = carsService;
    _authService = authService;
}

async function getView() {
    let userId = _authService.getUserId();

    let cars = await _carsService.getMyCars(userId);

    let templateResult = myListingsTemplate(cars);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}