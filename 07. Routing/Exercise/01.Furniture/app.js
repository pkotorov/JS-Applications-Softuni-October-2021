import dashboardPage from './pages/dashboard/dashboardPage.js';
import renderingMiddleware from './rendering/renderingMiddleware.js';
import nav from './nav/nav.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js'
import detailsPage from './pages/details/detailsPage.js';
import page from './node_modules/page/page.mjs';
import createPage from './pages/create/createPage.js'
import editPage from './pages/edit/editPage.js';
import myFurnituresPage from './pages/myFurniture/myFurnituresPage.js';

let divContainer = document.getElementById('viewContainer');
let navContainer = document.getElementById('navigation');
renderingMiddleware.initiliaze(divContainer, navContainer);

page('/dashboard', renderingMiddleware.decorateContext, nav.getView, dashboardPage.getView);
page('/index.html', '/dashboard');
page('/', '/dashboard');
page('/login', renderingMiddleware.decorateContext, nav.getView, loginPage.getView);
page('/register', renderingMiddleware.decorateContext, nav.getView, registerPage.getView);
page('/logout', renderingMiddleware.decorateContext, nav.getView, async () => { localStorage.clear(); page.redirect('login'); });
page('/details/:id', renderingMiddleware.decorateContext, nav.getView, detailsPage.getView);
page('/create', renderingMiddleware.decorateContext, nav.getView, createPage.getView);
page('/edit/:id', renderingMiddleware.decorateContext, nav.getView, editPage.getView);
page('/my-furniture', renderingMiddleware.decorateContext, nav.getView, myFurnituresPage.getView)

page.start();