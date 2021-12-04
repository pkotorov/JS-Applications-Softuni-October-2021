import { html } from "../node_modules/lit-html/lit-html.js";
import { ifDefined } from "../node_modules/lit-html/directives/if-defined.js";

let townTemp = (town) => html`<li class="${ifDefined(town.class)}">${town.name}</li>`;

let townsTemp = (towns) => html`
    <ul>
        ${towns.map(t => townTemp(t))}
    </ul>`;

let matchesTemp = (matches) => html`
<span>${matches} matches found</span>`;

export {
    townsTemp,
    matchesTemp
}
