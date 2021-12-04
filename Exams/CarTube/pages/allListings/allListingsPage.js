import { allListingsTemplate } from "./allListingsTemplate.js";

let _render = undefined;
let _carsService = undefined;

function initialize(render, carsService) {
    _render = render;
    _carsService = carsService;
}

async function getView() {
    let cars = await _carsService.getAllCars();

    let templateResult = allListingsTemplate(cars);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}