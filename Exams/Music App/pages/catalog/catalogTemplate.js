import { html } from "../../node_modules/lit-html/lit-html.js";

let albumTemplate = (album, isLoggedIn) => html`
<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLoggedIn 
        ? html`
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>`
        : ''}
    </div>
</div>
`

export let catalogTemplate = (albums, isLoggedIn) => html`
<!--Catalog-->
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length > 0
    ? html`
        ${albums.map(a => albumTemplate(a, isLoggedIn))}`
    : html`
        <!--No albums in catalog-->
        <p>No Albums in Catalog!</p>`}
</section>
`