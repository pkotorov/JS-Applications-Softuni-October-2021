import { editTemplate } from "./editTemplate.js";

let _render = undefined;
let _bookService = undefined;

function initialize(render, bookService) {
    _render = render;
    _bookService = bookService;
}

async function getView(ctx) {
    let id = ctx.params.id;

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

                let addBookRequest = await _bookService.edit(id, book);

                ctx.page.redirect("/details/" + id);
            }
    }

    let bookFromReq = await _bookService.getOne(id);

    let templateResult = editTemplate(bookFromReq, submitHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}