import { registerTemplate } from "./registerTemplate.js";

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
        let rePassword = form.get('confirm-password');

        if (password.trim() !== rePassword.trim()) {
            return alert("Passwords do not match.");
        }

        if (email.trim() === '') {
            return alert("Email is required.");
        }

        if (password.trim() === '') {
            return alert("Password is required.");
        }

        if (rePassword.trim() === '') {
            return alert("Confirm password is required.");
        }

        let user = {
            email: email,
            password: password
        };

        try {
            let registerRequest = await _authService.register(user);
            ctx.page.redirect("/");
        } catch (ex) {
            alert(ex.message);
        }
    };

    let form = {
        submitHandler: submitHandler
    };

    let templateResult = registerTemplate(form);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}