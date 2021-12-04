import { html } from "../../node_modules/lit-html/lit-html.js";

let gameTemplate = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}">
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>
`

export let allGamesTemplate = (games) => html`
<!-- Catalogue -->
<section id="catalog-page">
    <h1>All Games</h1>
    ${games.length !== 0
        ? html`
            <!-- Display div: with information about every game (if any) -->
            ${games.map(g => gameTemplate(g))}
            `
        : html`
            <!-- Display paragraph: If there is no games  -->
            <h3 class="no-articles">No articles yet</h3>`}
</section>
`