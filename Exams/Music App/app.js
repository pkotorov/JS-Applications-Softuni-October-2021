import page from "./node_modules/page/page.mjs";
import catalogPage from "./pages/catalog/catalogPage.js";
import createPage from "./pages/create/createPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";
import homePage from "./pages/home/homePage.js";
import loginPage from "./pages/login/loginPage.js";
import nav from "./pages/navigation/nav.js";
import registerPage from "./pages/register/registerPage.js";
import searchPage from "./pages/search/searchPage.js";

import { LitRenderer } from "./rendering/litRenderer.js";
import albumsService from "./services/albumsService.js";
import authService from "./services/authService.js";

const navElement = document.querySelector("#box > header");
const mainElement = document.querySelector("#main-content");

const litRenderer = new LitRenderer();

const navRenderHandler = litRenderer.createRenderHandler(navElement);
const appRenderHandler = litRenderer.createRenderHandler(mainElement);

nav.initialize(navRenderHandler, authService);
loginPage.initialize(appRenderHandler, authService);
registerPage.initialize(appRenderHandler, authService);
homePage.initialize(appRenderHandler);
catalogPage.initialize(appRenderHandler, albumsService, authService);
createPage.initialize(appRenderHandler, albumsService);
detailsPage.initialize(appRenderHandler, albumsService, authService);
editPage.initialize(appRenderHandler, albumsService);
searchPage.initialize(appRenderHandler, albumsService, authService);

page(nav.getView);

page("/index.html", "/");
page("/login", loginPage.getView);
page("/register", registerPage.getView);
page("/logout", authService.logout);
page("/", homePage.getView);
page("/catalog", catalogPage.getView);
page("/create", createPage.getView);
page("/details/:id", detailsPage.getView);
page("/edit/:id", editPage.getView);
page("/search", searchPage.getView);

page.start();