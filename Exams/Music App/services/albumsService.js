import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = "http://localhost:3030/data/albums";

async function create(album) {
  let createRes = await jsonRequest(baseUrl, "Post", album, true);
}

async function getAllAlbums() {
  let allAlbums = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);
  return allAlbums;
}

async function getAlbumsByName(name) {
  let albums = await jsonRequest(`${baseUrl}?where=name%20LIKE%20%22${name}%22`);
  return albums;
}

async function getOne(id) {
  return await jsonRequest(`${baseUrl}/${id}`);
}

async function edit(id, data) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Put', data, true);
}

async function deleteAlbum(id) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
}

export default {
  create,
  getAllAlbums,
  getOne,
  edit,
  deleteAlbum,
  getAlbumsByName
};
