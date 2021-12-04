import { html } from "../node_modules/lit-html/lit-html.js";
import { ifDefined } from "../node_modules/lit-html/directives/if-defined.js";

let studentInfoTemplate = (student) => html` 
<tr class=${ifDefined(student.class)}>
  <td>${student.firstName} ${student.lastName}</td>
  <td>${student.email}</td>
  <td>${student.course}</td>
</tr>`;

export let rowTemplate = (students) => html`
  ${students.map((st) => studentInfoTemplate(st))}`;
