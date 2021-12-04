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
        let username = form.get('username');
        let gender = form.get('gender');

        if(email !== '' 
            && password !== ''
            && username !== ''
            && gender !== '') {
                let user = {
                    email: email,
                    password: password,
                    username: username,
                    gender: gender
                };
        
                let registerReq = await _authService.register(user);
        
                ctx.page.redirect('/all-memes');
            }
    };

    let templateResult = registerTemplate(submitHandler);
    _render(templateResult);
}

export default {
    initialize,
    getView,
}