import { render } from "../node_modules/lit-html/lit-html.js";
import { rowTemplate } from './template.js';

async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   let tableBodyEl = document.querySelector('tbody');

   let loadTableRequest = await fetch(`http://localhost:3030/jsonstore/advanced/table`);
   let loadTableRes = await loadTableRequest.json();

   let arrayFromData = Object.values(loadTableRes);
   render(rowTemplate(arrayFromData), tableBodyEl);

   function onClick() {
      arrayFromData.forEach(c => delete c.class);
      
      let inputEl = document.querySelector('#searchField');
      let input = inputEl.value.toLowerCase();
      
      arrayFromData.forEach(x => {
         for (const key in x) {
            if(x[key].toLowerCase().includes(input)) {
               x.class = 'select';
            }
         }
      });

      render(rowTemplate(arrayFromData), tableBodyEl);
      inputEl.value = '';
   }
}

solve();
