import { detailsTemplate } from "./detailsTemplate.js";

let _render = undefined;
let _gameService = undefined;
let _authService = undefined;
let _commentService = undefined;

function initialize(render, gameService, authService, commentService) {
    _render = render;
    _gameService = gameService;
    _authService = authService;
    _commentService = commentService;
}

async function comment(gameId, ctx, e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let comment = form.get("comment");

    if (comment.trim() !== "") {
        let newComment = {
            gameId: gameId,
            comment: comment
        };

        let createCommentRes = await _commentService.createComment(newComment);

        document.querySelector(".create-comment > form").reset();

        ctx.page.redirect(`/details/${gameId}`);
    }
}

async function deleteGame(ctx, gameId) {
    let confirmed = confirm("Are you sure you want to delete the game?");

    if (confirmed) {
        let deleteRes = await _gameService.deleteGame(gameId);

        ctx.page.redirect("/");
    }
}

async function getView(ctx) {
    let gameId = ctx.params.id;

    let game = await _gameService.getOne(gameId);

    let isOwner = _authService.getUserId() === game._ownerId;
    let isLoggedIn = _authService.isLoggedIn();

    let userInfo = {
        isOwner: isOwner,
        isLoggedIn: isLoggedIn,
    };

    let boundDeleteClickHandler = deleteGame.bind(null, ctx, gameId);

    let comments = await _commentService.getAll(gameId);

    let boundCommentHandler = comment.bind(null, gameId, ctx);

    let templateResult = detailsTemplate(game, userInfo, boundDeleteClickHandler, comments, boundCommentHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}