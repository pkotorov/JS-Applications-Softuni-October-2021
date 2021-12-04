import { homeTemplate } from "./homeTemplate.js";

let _render = undefined;

function initialize(render) {
    _render = render;
};

function getView() {
    let templateResult = homeTemplate([]);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}