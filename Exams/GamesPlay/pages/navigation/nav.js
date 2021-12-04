import { navTemplate } from "./navTemplate.js";

let _render = undefined;
let _authService = undefined;

function initialize(render, authService) {
    _render = render;
    _authService = authService;
}

async function getView(ctx, next) {
    let isLoggedIn = _authService.isLoggedIn();
    
    let templateResult = navTemplate(isLoggedIn);
    _render(templateResult);

    next();
}

export default {
    initialize,
    getView,
}