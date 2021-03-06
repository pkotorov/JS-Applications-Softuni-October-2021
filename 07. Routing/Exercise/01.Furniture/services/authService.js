import { jsonRequest } from '../helpers/jsonRequest.js';

let baseUrl = 'http://localhost:3030/users';

function getAuthToken() {
  return localStorage.getItem("authToken");
}

function getUsername() {
  return localStorage.getItem("username");
}

function getUserId() {
  return localStorage.getItem("userId");
}

function isLoggedIn() {
  return localStorage.getItem("authToken") !== null;
}

async function login(user) {
    let result = await jsonRequest(`${baseUrl}/login`, 'Post', user);
    localStorage.setItem('userId', result._id);
    localStorage.setItem('authToken', result.accessToken);
    localStorage.setItem('username', result.email);
}

async function register(user) {
  let result = await jsonRequest(`${baseUrl}/register`, 'Post', user);
  localStorage.setItem('userId', result._id);
  localStorage.setItem('authToken', result.accessToken);
  localStorage.setItem('username', result.email);
}

export default {
  getAuthToken,
  getUserId,
  getUserId,
  isLoggedIn,
  login,
  register
};
