import {createTemplate} from './createTemplate.js';

let _render = undefined;
let _memeService = undefined;

function initialize(render, memeService) {
    _render = render;
    _memeService = memeService;
}

async function getView(ctx) {
    async function submitHandler(e) {
        e.preventDefault();

        let form = new FormData(e.currentTarget);

        let meme = {
            title: form.get('title'),
            description: form.get('description'),
            imageUrl: form.get('imageUrl')
        };

        if (meme.title !== ''
            && meme.description !== ''
            && meme.imageUrl !== '') {
                let createReq = await _memeService.create(meme);

                ctx.page.redirect('/all-memes');
            }
    }

    let templateResult = createTemplate(submitHandler);
    _render(templateResult)
}

export default {
    initialize, 
    getView,
}