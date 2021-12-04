import { searchResultsTemplate, searchTemplate } from "./searchTemplate.js";

let _render = undefined;
let _carsService = undefined;

function initialize(render, carsService) {
    _render = render;
    _carsService = carsService;
}

async function search() {
    let year = document.querySelector("#search-input");

    let cars = await _carsService.getCarsByYear(year.value);

    year.value = '';

    let templateResult = searchResultsTemplate(cars, search);
    _render(templateResult);
}

async function getView() {
    let boundClickHandler = search.bind(null);

    let templateResult = searchTemplate(boundClickHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}