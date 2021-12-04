import { jsonRequest } from "../helpers/jsonRequest.js";

const baseUrl = "http://localhost:3030/data/likes";

async function likeBook(bookId) {
    let body = {
        bookId: bookId
    };

    let likeResponse = await jsonRequest(baseUrl, "Post", body, true);

    return likeResponse;
}

async function getBookLikes(bookId) {
    return await jsonRequest(`${baseUrl}?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

async function getUserLike(bookId, userId) {
    return await jsonRequest(`${baseUrl}?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export default {
    likeBook,
    getBookLikes,
    getUserLike,
}