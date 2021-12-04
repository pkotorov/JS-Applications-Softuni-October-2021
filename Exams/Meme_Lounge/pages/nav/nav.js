import { navTemplate } from "./navTemplate.js";

let _render = undefined;
let _authService = undefined;

function initialize(render, authService) {
    _render = render;
    _authService = authService;
};

function getView(ctx, next) {
    let userInfo = {
        isLoggedIn: _authService.isLoggedIn(),
        email: _authService.getUserEmail(),
    };

    let currentPage = ctx.path;
    let templateResult = navTemplate(userInfo, currentPage);
    _render(templateResult);

    next();
}

export default {
    initialize,
    getView,
}