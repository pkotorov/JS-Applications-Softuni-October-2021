import { render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';
import { townsTemp, matchesTemp } from './template.js';

let divEl = document.getElementById('towns');
let townsAsObj = towns.map(t => ({ name: t }));
render(townsTemp(townsAsObj), divEl);

let searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', search);

let result = document.getElementById('result');

function search() {
   let inputEl = document.getElementById('searchText');
   let input = inputEl.value.toLowerCase();

   let allTowns = towns.map(t => ({ name: t }));
   let matchedTowns = allTowns.filter(t => t.name.toLowerCase().includes(input));
   matchedTowns.forEach(t => t.class = 'active');

   render(townsTemp(allTowns), divEl);

   let matches = matchedTowns.length;
   render(matchesTemp(matches), result);
}
