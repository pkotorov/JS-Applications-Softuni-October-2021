import { booksTemplate } from "./myBooksTemplate.js";

let _render = undefined;
let _bookService = undefined;
let _authService = undefined;

function initialize(render, bookService, authService) {
    _render = render;
    _bookService = bookService;
    _authService = authService;
}

async function getView(ctx) {
    let id = _authService.getUserId();
    let books = await _bookService.getMyBooks(id);

    let templateResult = booksTemplate(books);
    _render(templateResult);
}

export default {
    initialize, 
    getView,
}