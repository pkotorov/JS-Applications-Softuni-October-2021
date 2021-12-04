import { html } from '../../node_modules/lit-html/lit-html.js';

const townTemplate = (town) => html`
    <li>${town}</li>`;

export const myTowns = (towns) => html`
    <ul>${towns.map(t => townTemplate(t))}</ul>`;