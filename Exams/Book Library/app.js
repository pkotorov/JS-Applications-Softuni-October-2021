import page from "./node_modules/page/page.mjs";

import { LitRenderer } from "./rendering/litRenderer.js";
import authService from "./services/authService.js";
import bookService from "./services/bookService.js";
import likeService from "./services/likeService.js";
import nav from "./pages/nav/nav.js";
import dashboardPage from "./pages/dashboard/dashboardPage.js";
import loginPage from "./pages/login/loginPage.js";
import registerPage from "./pages/register/registerPage.js";
import addBookPage from "./pages/addBook/addBookPage.js";
import detailsPage from "./pages/details/detailsPage.js";
import editPage from "./pages/edit/editPage.js";
import myBooksPage from "./pages/myBooks/myBooksPage.js";

const litRenderer = new LitRenderer();

const navElement = document.getElementById("site-header");
const mainElement = document.getElementById("site-content");

const navRendererHandler = litRenderer.createRenderHandler(navElement);
nav.initiliaze(navRendererHandler, authService);

const appRenderHandler = litRenderer.createRenderHandler(mainElement);
dashboardPage.initialize(appRenderHandler, bookService);
loginPage.initialize(appRenderHandler, authService);
registerPage.initialize(appRenderHandler, authService);
addBookPage.initialize(appRenderHandler, bookService);
detailsPage.initialize(appRenderHandler, bookService, authService, likeService);
editPage.initialize(appRenderHandler, bookService);
myBooksPage.initialize(appRenderHandler, bookService, authService);

page(nav.getView);

page("/", "/dashboard");
page("/dashboard", dashboardPage.getView);
page("/login", loginPage.getView);
page("/register", registerPage.getView);
page("/logout", authService.logout);
page("/add-book", addBookPage.getView);
page("/details/:id", detailsPage.getView);
page("/edit/:id", editPage.getView);
page("/my-books", myBooksPage.getView);

page.start();