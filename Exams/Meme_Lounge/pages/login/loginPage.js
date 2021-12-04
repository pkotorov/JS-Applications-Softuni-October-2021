import { notificationTemplate } from "../../shared/notificationTemplate.js";
import { loginTemplate } from "./loginTemplate.js";

let _render = undefined;
let _authService = undefined;

function initialize(render, authService) {
    _render = render;
    _authService = authService;
}

async function getView(ctx) {
    async function submitHandler(e) {
        e.preventDefault();

        let form = new FormData(e.currentTarget);
        let email = form.get('email');
        let password = form.get('password');

        let user = {
            email: email,
            password: password
        };

        try {
            let loginResp = await _authService.login(user);
            ctx.page.redirect('/all-memes');
        } catch(message) {
            setTimeout(() => {
            _render(notificationTemplate(message));
            }, 3000);
            let templateResult = loginTemplate(form);
            _render(templateResult);
        }
    };

    let form = {
        submitHandler: submitHandler
    };

    let templateResult = loginTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}