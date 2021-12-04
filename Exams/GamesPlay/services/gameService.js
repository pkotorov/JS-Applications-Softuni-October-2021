import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = "http://localhost:3030/data/games";

async function create(game) {
  let createRes = await jsonRequest(baseUrl, "Post", game, true);
}

async function getAllGamesForHomePage() {
  let getAllGames = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc&distinct=category`);
  return getAllGames;
}

async function getAllGames() {
  let getAllGames = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
  return getAllGames;
}

async function getOne(id) {
  return await jsonRequest(`${baseUrl}/${id}`);
}

async function edit(id, data) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Put', data, true);
}

async function deleteGame(id) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
}

async function getMyBooks(id) {
  return await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`, 'Get', undefined, true);
}

export default {
  create,
  getAllGamesForHomePage,
  getOne,
  edit,
  deleteGame,
  getMyBooks,
  getAllGames
};
