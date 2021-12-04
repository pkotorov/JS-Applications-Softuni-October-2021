import { editTemplate } from "./editTemplate.js";

let _render = undefined;
let _memeService = undefined;

function initialize(render, memeService) {
  _render = render;
  _memeService = memeService;
}

async function getView(ctx) {
  let id = ctx.params.id;
  let meme = await _memeService.getOne(id);
  let form = {
    submitHandler: submitHandler,
    values: {},
  };

  form.values = {
    title: meme.title,
    description: meme.description,
    imageUrl: meme.imageUrl,
  };

  let templateResult = editTemplate(form);
  _render(templateResult);

  async function submitHandler(e) {
    e.preventDefault();

    let form = new FormData(e.currentTarget);

    let meme = {
      title: form.get("title"),
      description: form.get("description"),
      imageUrl: form.get("imageUrl"),
    };

    let updateReq = await _memeService.edit(id, meme);

    ctx.page.redirect(`/details/${ctx.params.id}`);
  }
}

export default {
  initialize,
  getView,
};
