import { LitRenderer } from "./rendering/litRenderer.js";
import nav from "./pages/navigation/nav.js";
import loginPage from "./pages/login/loginPage.js";
import authService from "./services/authService.js";

import page from "./node_modules/page/page.mjs";
import registerPage from "./pages/register/registerPage.js";
import homePage from "./pages/home/homePage.js";
import allListingsPage from "./pages/allListings/allListingsPage.js";
import carsService from "./services/carsService.js";
import createPage from "./pages/create/createPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";
import myListingsPage from "./pages/myListings/myListingsPage.js";
import searchPage from "./pages/search/searchPage.js";

const navElement = document.querySelector("#container > header");
const mainElement = document.querySelector("#site-content");

const litRenderer = new LitRenderer();

const navRenderHandler = litRenderer.createRenderHandler(navElement);
const mainRenderHandler = litRenderer.createRenderHandler(mainElement);

nav.initialize(navRenderHandler, authService);
loginPage.initialize(mainRenderHandler, authService);
registerPage.initialize(mainRenderHandler, authService);
homePage.initialize(mainRenderHandler);
allListingsPage.initialize(mainRenderHandler, carsService);
createPage.initialize(mainRenderHandler, carsService);
detailsPage.initialize(mainRenderHandler, carsService, authService);
editPage.initialize(mainRenderHandler, carsService);
myListingsPage.initialize(mainRenderHandler, carsService, authService);
searchPage.initialize(mainRenderHandler, carsService);

page(nav.getView);

page("/index.html", "/");
page("/login", loginPage.getView);
page("/register", registerPage.getView);
page("/", homePage.getView);
page("/logout", authService.logout);
page("/all-listings", allListingsPage.getView);
page("/create", createPage.getView);
page("/details/:id", detailsPage.getView);
page("/edit/:id", editPage.getView);
page("/my-listings", myListingsPage.getView);
page("/all-listings-by-year", searchPage.getView);

page.start();