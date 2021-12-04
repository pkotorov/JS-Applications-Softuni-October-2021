import { navTemplate } from "./navTemplate.js";

let _authService = undefined;
let _render = undefined;

function initiliaze(render, authService) {
    _authService = authService;
    _render = render;
}

function getView(ctx, next) {
    let userInfo = {
        isLoggedIn: _authService.isLoggedIn(),
        userEmail: _authService.getUserEmail(),
    };

    let templateResult = navTemplate(userInfo);
    _render(templateResult);

    next();
}

export default {
    initiliaze, 
    getView,
}