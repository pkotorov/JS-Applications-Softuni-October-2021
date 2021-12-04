import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = "http://localhost:3030/data/memes";

async function create(data) {
  let meme = {
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
  };

  let createRes = await jsonRequest(baseUrl, "Post", meme, true);
}

async function getAll() {
  let getAllMemes = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
  return getAllMemes;
}

async function getOne(id) {
  return await jsonRequest(`${baseUrl}/${id}`);
}

async function edit(id, data) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Put', data, true);
}

async function deleteMeme(id) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
}

async function getMyMemes(id) {
  return await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`, 'Get', undefined, true);
}

export default {
  create,
  getAll,
  getOne,
  edit,
  deleteMeme,
  getMyMemes
};
