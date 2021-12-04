import { navTemplate } from "./navTemplate.js";

let _render = undefined;
let _authService = undefined;

function initialize(render, authService) {
    _render = render;
    _authService = authService;
}

async function getView(ctx, next) {
    let isLoggedIn = _authService.isLoggedIn();
    let username = _authService.getUsername();

    let userInfo = {
        isLoggedIn: isLoggedIn,
        username: username
    };
    
    let templateResult = navTemplate(userInfo);
    _render(templateResult);

    next();
}

export default {
    initialize,
    getView,
}