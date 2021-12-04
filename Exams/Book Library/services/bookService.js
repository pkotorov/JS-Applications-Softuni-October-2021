import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = "http://localhost:3030/data/books";

async function create(book) {
  let createRes = await jsonRequest(baseUrl, "Post", book, true);
}

async function getAll() {
  let getAllBooks = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
  return getAllBooks;
}

async function getOne(id) {
  return await jsonRequest(`${baseUrl}/${id}`);
}

async function edit(id, data) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Put', data, true);
}

async function deleteBook(id) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
}

async function getMyBooks(id) {
  return await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`, 'Get', undefined, true);
}

export default {
  create,
  getAll,
  getOne,
  edit,
  deleteBook,
  getMyBooks
};
