import page from "./node_modules/page/page.mjs";

import { LitRenderer } from "./rendering/litRenderer.js";
import authService from "./services/authService.js";
import gameService from "./services/gameService.js";
import commentService from "./services/commentService.js"
import nav from "./pages/navigation/nav.js";
import loginPage from "./pages/login/loginPage.js";
import registerPage from "./pages/register/registerPage.js";
import homePage from "./pages/home/homePage.js";
import allGamesPage from "./pages/allGames/allGamesPage.js";
import createPage from "./pages/create/createPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";

const navElement = document.querySelector("#box > header");
const mainElement = document.querySelector("#main-content");

const litRenderer = new LitRenderer();

const navRenderHandler = litRenderer.createRenderHandler(navElement);
const mainRenderHandler = litRenderer.createRenderHandler(mainElement);

nav.initialize(navRenderHandler, authService);
loginPage.initialize(mainRenderHandler, authService);
registerPage.initialize(mainRenderHandler, authService);
homePage.initialize(mainRenderHandler, gameService);
allGamesPage.initialize(mainRenderHandler, gameService);
createPage.initialize(mainRenderHandler, gameService);
detailsPage.initialize(mainRenderHandler, gameService, authService, commentService);
editPage.initialize(mainRenderHandler, gameService);

page(nav.getView);

page("/index.html", "/");
page("/login", loginPage.getView);
page("/register", registerPage.getView);
page("/logout", authService.logout);
page("/", homePage.getView);
page("/all-games", allGamesPage.getView);
page("/create", createPage.getView);
page("/details/:id", detailsPage.getView);
page("/edit/:id", editPage.getView);

page.start();