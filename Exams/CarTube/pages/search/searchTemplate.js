import { html } from "../../node_modules/lit-html/lit-html.js";

let carTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src=${car.imageUrl}>
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`

export let searchResultsTemplate = (cars, clickHandler) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${clickHandler} class="button-list">Search</button>
    </div>
</section>

<h2>Results:</h2>
<div class="listings">

    ${cars.length > 0 
    ? html`
        <!-- Display all records -->
        ${cars.map(c => carTemplate(c))}`
    : html`
        <!-- Display if there are no matches -->
        <p class="no-cars"> No results.</p>`}
</div>
`

export let searchTemplate = (clickHandler) => html`
<!-- Search Page -->
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${clickHandler} class="button-list">Search</button>
    </div>
</section>`