let uri = "http://localhost:3030/jsonstore/collections/books";

let loadButton = document.getElementById("loadBooks");

loadButton.addEventListener("click", loadBooks);

let tableBody = document.querySelector("tbody");

loadBooks();

let createFormEl = document.querySelector(".save");

let editFormEl = document.querySelector(".edit");

editFormEl.addEventListener("submit", async (el) => {
  el.preventDefault();

  let bookToEdit = el.currentTarget;

  console.log(bookToEdit);

  editFormEl.style.display = "block";
  createFormEl.style.display = "none";

  let bookTitle = bookToEdit.firstChild.textContent;
  let bookAuthor = bookToEdit.firstChild.nextSibling.textContent;

  editFormEl.querySelector('input[name="title"]').value = bookTitle;
  editFormEl.querySelector('input[name="author"]').value = bookAuthor;

  let bookId = bookToEdit.getAttribute("data-id");

  let editedBook = {
    title: editFormEl.querySelector('input[name="title"]').value,
    author: editFormEl.querySelector('input[name="author"]').value,
  };

  let putReq = await fetch(`${uri}/${bookId}`, {
    method: "PUT",
    "Content-Type": "application/json",
    body: JSON.stringify(editedBook),
  });

  let reqResult = await putReq.json();

  let newRowEl = createElement(reqResult.title, reqResult.author, bookId);

  let replacedBookTr = tableBody.querySelector(`tr[data-id="${bookId}"]`);
  replacedBookTr.replaceWith(newRowEl);

  editFormEl.querySelector('input[name="title"]').value = "";
  editFormEl.querySelector('input[name="author"]').value = "";

  editFormEl.style.display = "none";
  createFormEl.style.display = "block";
});

createFormEl.addEventListener("submit", createNewBook);

async function loadBooks() {
  tableBody.querySelectorAll("tr").forEach((tr) => tr.remove());

  let getResponse = await fetch(uri);
  let data = await getResponse.json();

  console.log(data);

  Object.keys(data).forEach((book) => {
    let newEl = createElement(data[book].title, data[book].author, book);

    tableBody.appendChild(newEl);
  });
}

async function createNewBook(e) {
  e.preventDefault();

  let formData = new FormData(createFormEl);
  let newBook = {
    title: formData.get("title"),
    author: formData.get("author"),
  };

  let postNewBook = await fetch(uri, {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(newBook),
  });

  createFormEl.querySelector('input[name="title"]').value = "";
  createFormEl.querySelector('input[name="author"]').value = "";

  let createResult = await postNewBook.json();
  let newEl = createElement(
    createResult.title,
    createResult.author,
    createResult._id
  );

  tableBody.appendChild(newEl);
}

function createElement(title, author, id) {
  let rowElement = document.createElement("tr");
  rowElement.dataset.id = id;

  let titleElement = document.createElement("td");
  titleElement.textContent = title;

  let authorElement = document.createElement("td");
  authorElement.textContent = author;

  let tdElementForButtons = document.createElement("td");

  let editButton = document.createElement("button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", editBook);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  tdElementForButtons.appendChild(editButton);
  tdElementForButtons.appendChild(deleteButton);

  rowElement.appendChild(titleElement);
  rowElement.appendChild(authorElement);
  rowElement.appendChild(tdElementForButtons);

  return rowElement;
}

async function editBook(e) {
  let bookToEdit = e.currentTarget.parentNode.parentNode;

  console.log(bookToEdit);

  editFormEl.style.display = "block";
  createFormEl.style.display = "none";

  let bookTitle = bookToEdit.firstChild.textContent;
  let bookAuthor = bookToEdit.firstChild.nextSibling.textContent;

  editFormEl.querySelector('input[name="title"]').value = bookTitle;
  editFormEl.querySelector('input[name="author"]').value = bookAuthor;
}
