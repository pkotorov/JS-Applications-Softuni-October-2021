import { html } from "../../node_modules/lit-html/lit-html.js";

export let detailsTemplate = (meme, isOwner, clickHandler) => html`
  <section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl} />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>
        ${isOwner
          ? html`<!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
              <a class="button warning" href="/edit/${meme._id}">Edit</a>
              <button @click=${clickHandler} class="button danger">Delete</button>`
          : ""}
      </div>
    </div>
  </section>
`;
