import { detailsTemplate } from "./detailsTemplate.js";

let _render = undefined;
let _bookService = undefined;
let _authService = undefined;
let _likeService = undefined;

function initialize(render, bookService, authService, likeService) {
    _render = render;
    _bookService = bookService;
    _authService = authService;
    _likeService = likeService;
}

async function getView(ctx) {
    let id = ctx.params.id;

    async function deleteBook(e) {
        e.preventDefault();
        
        let confirmed = confirm("Are you sure you want to delete the book?");

        if (confirmed) {
            let deleteRequest = await _bookService.deleteBook(id);
            ctx.page.redirect("/dashboard");
        }
    }

    let userId = _authService.getUserId();

    let book = await _bookService.getOne(id);
    let isOwner = _authService.getUserId() === book._ownerId;
    let isLoggedIn = _authService.isLoggedIn();
    let likesCount = await _likeService.getBookLikes(id);
    let userLike = await _likeService.getUserLike(book._id, userId);

    let templateResult = detailsTemplate(book, isOwner, deleteBook, isLoggedIn, likesCount, likeBook, userLike);
    _render(templateResult);

    async function likeBook(e) {
        e.preventDefault();

        let likeRes = await _likeService.likeBook(id);

        likesCount = await _likeService.getBookLikes(id);

        userLike = await _likeService.getUserLike(book._id, userId);

        _render(detailsTemplate(book, isOwner, deleteBook, isLoggedIn, likesCount, likeBook, userLike));
    }
}

export default {
    initialize, 
    getView,
}