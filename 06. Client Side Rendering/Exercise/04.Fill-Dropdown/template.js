import { html } from '../node_modules/lit-html/lit-html.js';

let optionTemp = (option) => html`
    <option value=${option._id}>${option.text}</option>`;

export let allOptionsTemp = (options) => html`${options.map(o => optionTemp(o))}`;