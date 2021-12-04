import { allMyMemesTemplate } from "./myProfileTemplate.js";

let _render = undefined;
let _memeService = undefined;
let _authService = undefined;

function initialize(render, memeService, authService) {
  _render = render;
  _memeService = memeService;
  _authService = authService;
}

async function getView(ctx) {
  let id = _authService.getUserId();
  let memes = await _memeService.getMyMemes(id);

  let userInfo = {
      username: _authService.getUsername(),
      email: _authService.getUserEmail(),
      gender: _authService.getUserGender(),
      countMemes: memes.length,
  }

  let templateResult = allMyMemesTemplate(memes, userInfo);
  _render(templateResult);
}

export default {
  initialize,
  getView,
};
