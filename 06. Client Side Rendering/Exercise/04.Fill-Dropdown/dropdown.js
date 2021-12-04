import { allOptionsTemp } from './template.js';
import { render } from '../node_modules/lit-html/lit-html.js';

let optionsReq = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
let optionsRes = await optionsReq.json();

let selectEl = document.getElementById('menu');
let optionsAsArr = Object.values(optionsRes);
render(allOptionsTemp(optionsAsArr), selectEl);

let formEl = document.querySelector('form');
formEl.addEventListener('submit', addItem);

async function addItem(e) {
    e.preventDefault();

    let formData = new FormData(formEl);
    let text = formData.get('text');

    if(text !== '') {
        let option = {
            text: text
        };
    
        let optionPostReq = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
            headers: { 'Content-Type': 'application/json' },
            method: 'Post',
            body: JSON.stringify(option)
        });

        if (optionPostReq.ok) {
            let optionPostRes = await optionPostReq.json();
            optionsAsArr.push(optionPostRes);
            render(allOptionsTemp(optionsAsArr), selectEl);
        }

        formEl.reset();
    }
}