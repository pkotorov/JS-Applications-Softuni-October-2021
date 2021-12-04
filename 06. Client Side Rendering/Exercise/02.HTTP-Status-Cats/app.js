import { catsTemplate } from "./template.js";
import { cats } from "./catSeeder.js";
import { render } from "../node_modules/lit-html/lit-html.js";

let catsEl = document.getElementById('allCats');
render(catsTemplate(cats, toggleInfo), catsEl);

function toggleInfo(e) {
    let divParent = e.target.closest('.info');
    let divEl = divParent.querySelector('.status');

    e.target.textContent = e.target.textContent === 'Show status code'
        ? 'Hide status code'
        : 'Show status code'

    if (divEl.classList.contains('hidden')) {
        divEl.classList.remove('hidden');
    } else {
        divEl.classList.add('hidden');
    }
}