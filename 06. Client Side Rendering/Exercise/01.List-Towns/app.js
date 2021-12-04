import { myTowns } from "./templates/townTemplate.js";
import { render } from "../node_modules/lit-html/lit-html.js";

let form = document.querySelector('.content');
form.addEventListener('submit', loadTowns);

let divRoot = document.getElementById('root');

function loadTowns(e) {
    e.preventDefault();

    let formData = new FormData(form);
    let data = formData.get('towns');
    let towns = data.split(', ');

    render(myTowns(towns), divRoot);    
}
