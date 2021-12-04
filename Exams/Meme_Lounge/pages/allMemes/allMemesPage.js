import { allMemesTemplate } from "./allMemesTemplate.js";

let _render = undefined;
let _memeService = undefined;

function initialize(render, memeService) {
  _render = render;
  _memeService = memeService;
}

async function getView(ctx) {
  let memes = await _memeService.getAll();

  let templateResult = allMemesTemplate(memes);
  _render(templateResult);
}

export default {
  initialize,
  getView,
};
