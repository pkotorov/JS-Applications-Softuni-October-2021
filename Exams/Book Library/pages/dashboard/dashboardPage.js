import { dashboardTemplate } from "./dashboardTemplate.js";

let _render = undefined;
let _bookService = undefined;

function initialize(render, bookService) {
    _render = render;
    _bookService = bookService;
}

async function getView(ctx) {
    let books = await _bookService.getAll();

    let templateResult = dashboardTemplate(books);
    _render(templateResult);
}

export default {
    initialize, 
    getView,
}