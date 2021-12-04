import { addBookTemplate } from "./addBookTemplate.js";

let _render = undefined;
let _bookService = undefined;

function initialize(render, bookService) {
    _render = render;
    _bookService = bookService;
}

function getView(ctx) {
    async function submitHandler(e) {
        e.preventDefault();

        let form = new FormData(e.currentTarget);

        let title = form.get("title");
        let description = form.get("description");
        let imageUrl = form.get("imageUrl");
        let type = form.get("type");

        if (title.trim() !== ''
            && description.trim() !== ''
            && imageUrl.trim() !== '') {
                let book = {
                    title: title,
                    description: description,
                    imageUrl: imageUrl,
                    type: type
                };

                let addBookRequest = await _bookService.create(book);

                ctx.page.redirect("/dashboard");
            }
    }

    let form = {
        submitHandler: submitHandler
    };

    let templateResult = addBookTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}