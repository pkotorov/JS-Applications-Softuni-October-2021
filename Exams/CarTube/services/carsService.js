import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = "http://localhost:3030/data/cars";

async function create(car) {
  let createRes = await jsonRequest(baseUrl, "Post", car, true);
}

async function getAllCars() {
  let getAllCars = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
  return getAllCars;
}

async function getCarsByYear(year) {
  let getAllCarsByYear = await jsonRequest(`${baseUrl}?where=year%3D${year}`);
  return getAllCarsByYear;
}

async function getOne(id) {
  return await jsonRequest(`${baseUrl}/${id}`);
}

async function edit(id, data) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Put', data, true);
}

async function deleteCar(id) {
  return await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
}

async function getMyCars(userId) {
  return await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`, 'Get', undefined, true);
}

export default {
  create,
  getAllCars,
  getOne,
  edit,
  deleteCar,
  getMyCars,
  getCarsByYear
};
