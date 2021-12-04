import { html } from "../../node_modules/lit-html/lit-html.js";

export let allMyMemesTemplate = (memes, userInfo) => html`
  <section id="user-profile-page" class="user-profile">
    <article class="user-info">
      <img id="user-avatar-url" alt="user-profile" src=${userInfo.gender === 'male' ? '/images/male.png' : '/images/female.png'} />
      <div class="user-content">
        <p>Username: ${userInfo.username}</p>
        <p>Email: ${userInfo.email}</p>
        <p>My memes count: ${userInfo.countMemes}</p>
      </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
      <!-- Display : All created memes by this user (If any) -->
      ${memes.length !== 0
        ? html`
            ${memes.map(m => myMemeTemplate(m))}
            `
        : html`
        <!-- Display : If user doesn't have own memes  -->
            <p class="no-memes">No memes in database.</p>
      `}
    </div>
  </section>
`;

let myMemeTemplate = (meme) => html`
<div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl} />
        <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;
