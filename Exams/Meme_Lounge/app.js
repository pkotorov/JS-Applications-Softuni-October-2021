import nav from './pages/nav/nav.js';
import { LitRenderer } from './rendering/litRenderer.js';
import page from './node_modules/page/page.mjs';
import homePage from './pages/home/homePage.js';
import authService from './services/authService.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import createPage from './pages/create/createPage.js';
import memeService from './services/memeService.js';
import allMemesPage from './pages/allMemes/allMemesPage.js';
import detailsPage from './pages/details/detailsPage.js';
import editPage from './pages/edit/editPage.js';
import myProfilePage from './pages/myProfile/myProfilePage.js';

let litRenderer = new LitRenderer();

let navElement = document.getElementById('nav');
let mainElement = document.getElementById('app');

let navRendererHandler = litRenderer.createRenderHandler(navElement);
nav.initialize(navRendererHandler, authService);

let pageRendererHandler = litRenderer.createRenderHandler(mainElement);
homePage.initialize(pageRendererHandler);
loginPage.initialize(pageRendererHandler, authService);
registerPage.initialize(pageRendererHandler, authService);
createPage.initialize(pageRendererHandler, memeService);
allMemesPage.initialize(pageRendererHandler, memeService);
detailsPage.initialize(pageRendererHandler, memeService, authService);
editPage.initialize(pageRendererHandler, memeService);
myProfilePage.initialize(pageRendererHandler, memeService, authService);

page(nav.getView);

page('/', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/create', createPage.getView);
page('/all-memes', allMemesPage.getView);
page('/details/:id', detailsPage.getView);
page('/logout', authService.logout);
page('/edit/:id', editPage.getView);
page('/my-profile', myProfilePage.getView);
page('/index.html', '/');

page.start();
