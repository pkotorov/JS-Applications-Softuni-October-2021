import { jsonRequest } from "../helpers/jsonRequest.js";

const baseUrl = "http://localhost:3030/users";

async function login(userData) {
  let loginReq = await jsonRequest(`${baseUrl}/login`, "Post", userData);

  setUserdata(loginReq);
}

async function register(userData) {
  let registerReq = await jsonRequest(`${baseUrl}/register`, "Post", userData);

  setUserdata(registerReq);
}

const isLoggedIn = () => Boolean(localStorage.getItem("userId"));

const getUserEmail = () => localStorage.getItem("userEmail");

const getAuthToken = () => localStorage.getItem("authToken");

const getUserId = () => localStorage.getItem("userId");

function setUserdata(data) {
  localStorage.setItem("userEmail", data.email);
  localStorage.setItem("authToken", data.accessToken);
  localStorage.setItem("userId", data._id);
}

function clearUserData() {
  localStorage.clear();
}

async function logout(ctx) {
  let logoutRes = await jsonRequest(`${baseUrl}/logout`, 'Get', undefined, true, true);
  clearUserData();
  ctx.page.redirect('/');
}

export default {
  login,
  isLoggedIn,
  getUserEmail,
  register,
  getAuthToken,
  getUserId,
  logout,
};
