import { detailsTemplate } from "./detailsTemplate.js";

let _render = undefined;
let _memeService = undefined;
let _authService = undefined;

function initialize(render, memeService, authService) {
  _render = render;
  _memeService = memeService;
  _authService = authService;
}

async function getView(ctx) {
  let id = ctx.params.id;

  async function clickHandler() {
    let confirmed = window.confirm('Are you sure you want to delete your meme?');
    if (confirmed) {
      let deleteRes = await _memeService.deleteMeme(id);
      
      ctx.page.redirect('/all-memes');
    }
  }

  let meme = await _memeService.getOne(id);
  let isOwner = _authService.getUserId() === meme._ownerId;
  let templateResult = detailsTemplate(meme, isOwner, clickHandler);
  _render(templateResult);
}

export default {
  initialize,
  getView,
};
