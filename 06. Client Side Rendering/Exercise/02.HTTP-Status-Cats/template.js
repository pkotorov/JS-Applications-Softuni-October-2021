import { html } from "../node_modules/lit-html/lit-html.js";

let cTemp = (cat, clickHandler) => html` <li>
  <img
    src="./images/${cat.imageLocation}.jpg"
    width="250"
    height="250"
    alt="Card image cap"
  />
  <div class="info">
    <button class="showBtn" @click=${clickHandler}>Show status code</button>
    <div class="status hidden" id="${cat.id}">
      <h4>Status Code: ${cat.statusCode}</h4>
      <p>${cat.statusMessage}</p>
    </div>
  </div>
</li>`;

let catsTemplate = (cats, clickHandler) => html`
<ul>
    ${cats.map(c => cTemp(c, clickHandler))}
</ul>`;

export {
    catsTemplate,
}
