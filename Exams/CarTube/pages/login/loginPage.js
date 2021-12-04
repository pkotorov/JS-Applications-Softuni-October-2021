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
        let username = form.get('username');
        let password = form.get('password');

        if (username.trim() === '') {
            return alert("Username is required.");
        }

        if (password.trim() === '') {
            return alert("Password is required.");
        }

        let user = {
            username: username,
            password: password
        };

        try {
            let loginResp = await _authService.login(user);
            ctx.page.redirect("/all-listings");
        } catch (ex) {
            alert(ex.message);
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