import { html } from "../../node_modules/lit-html/lit-html.js";

let albumTemplate = (album, isLoggedIn) => html`
<!--If have matches-->
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

export let searchResultsTemplate = (albums, clickHandler, isLoggedIn) => html`
<!--Search Page-->
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${clickHandler}>Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        ${albums.length > 0 
        ? html`${albums.map(a => albumTemplate(a, isLoggedIn))}`
        : html`
            <!--If there are no matches-->
            <p class="no-result">No result.</p>`}
    </div>
</section>`

export let searchTemplate = (clickHandler) => html`
<!--Search Page-->
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${clickHandler}>Search</button>
    </div>

    <h2>Results:</h2>
</section>`