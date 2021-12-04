import { jsonRequest } from "../helpers/jsonRequest.js";

const baseUrl = "http://localhost:3030/data/comments";

async function getAll(gameId) {
    return await jsonRequest(`${baseUrl}?where=gameId%3D%22${gameId}%22`);
}

async function createComment(data) {
    let newComment = {
        gameId: data.gameId,
        comment: data.comment
    };

    let createRes = await jsonRequest(baseUrl, "Post", newComment, true, true);
}

export default {
    getAll,
    createComment
}