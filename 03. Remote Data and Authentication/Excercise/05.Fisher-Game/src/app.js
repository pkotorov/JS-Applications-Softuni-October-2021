let loadButton = document.querySelector(".load");
loadButton.addEventListener("click", loadData);

let catchesDivEl = document.querySelector("#catches");
catchesDivEl.querySelectorAll(".catch").forEach((c) => c.remove());

let logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logoutUser);

let addForm = document.getElementById("addForm");
addForm.addEventListener("submit", addNew);

if (localStorage.getItem("userId")) {
  document.querySelector(".add").disabled = false;
  document.querySelector("#guest").style.display = "none";
} else {
  document.querySelector("#user").style.display = "none";
}

async function addNew(e) {
  e.preventDefault();

  let formData = new FormData(addForm);
  let angler = formData.get("angler");
  let weight = formData.get("weight");
  let species = formData.get("species");
  let location = formData.get("location");
  let bait = formData.get("bait");
  let captureTime = formData.get("captureTime");

  let data = {
    angler: angler,
    weight: weight,
    species: species,
    location: location,
    bait: bait,
    captureTime: captureTime,
  };

  let addRequest = await fetch("http://localhost:3030/data/catches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });

  let addResponse = await addRequest.json();

  let newEl = createHtmlElement(addResponse);
  catchesDivEl.appendChild(newEl);

  addForm.reset();
}

async function loadData() {
  catchesDivEl.querySelectorAll(".catch").forEach((c) => c.remove());
  let loadRequest = await fetch("http://localhost:3030/data/catches");
  let loadResponse = await loadRequest.json();

  loadResponse.forEach((entry) => {
    let divEl = createHtmlElement(entry);
    catchesDivEl.appendChild(divEl);
  });

  console.log(loadResponse);
}

function createHtmlElement(data) {
  let divEl = document.createElement("div");
  divEl.className = "catch";

  let labelAngler = document.createElement("label");
  labelAngler.textContent = "Angler";
  divEl.appendChild(labelAngler);

  let inputAngler = document.createElement("input");
  inputAngler.className = "angler";
  inputAngler.setAttribute("type", "text");
  inputAngler.setAttribute("value", `${data.angler}`);
  divEl.appendChild(inputAngler);

  let labelWeight = document.createElement("label");
  labelWeight.textContent = "Weight";
  divEl.appendChild(labelAngler);

  let inputWeight = document.createElement("input");
  inputWeight.className = "weight";
  inputWeight.setAttribute("type", "text");
  inputWeight.setAttribute("value", `${data.weight}`);
  divEl.appendChild(inputWeight);

  let labelSpecies = document.createElement("label");
  labelSpecies.textContent = "Species";
  divEl.appendChild(labelSpecies);

  let inputSpecies = document.createElement("input");
  inputSpecies.className = "species";
  inputSpecies.setAttribute("type", "text");
  inputSpecies.setAttribute("value", `${data.species}`);
  divEl.appendChild(inputSpecies);

  let labelLocation = document.createElement("label");
  labelLocation.textContent = "Location";
  divEl.appendChild(labelLocation);

  let inputLocation = document.createElement("input");
  inputLocation.className = "location";
  inputLocation.setAttribute("type", "text");
  inputLocation.setAttribute("value", `${data.location}`);
  divEl.appendChild(inputLocation);

  let labelBait = document.createElement("label");
  labelBait.textContent = "Bait";
  divEl.appendChild(labelBait);

  let inputBait = document.createElement("input");
  inputBait.className = "bait";
  inputBait.setAttribute("type", "text");
  inputBait.setAttribute("value", `${data.bait}`);
  divEl.appendChild(inputBait);

  let captureTimeLabel = document.createElement("label");
  captureTimeLabel.textContent = "Capture Time";
  divEl.appendChild(captureTimeLabel);

  let inputCaptureTime = document.createElement("input");
  inputCaptureTime.className = "captureTime";
  inputCaptureTime.setAttribute("type", "number");
  inputCaptureTime.setAttribute("value", `${data.captureTime}`);
  divEl.appendChild(inputCaptureTime);

  let deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  divEl.appendChild(deleteButton);

  deleteButton.addEventListener("click", deleteEntry);

  let updateButton = document.createElement("button");
  updateButton.className = "update";
  updateButton.textContent = "Update";
  divEl.appendChild(updateButton);

  updateButton.addEventListener("click", updateEntry);

  divEl.dataset.id = data._id;
  divEl.dataset.ownerId = data._ownerId;

  deleteButton.disabled =
    localStorage.getItem("userId") !== divEl.dataset.ownerId;
  updateButton.disabled =
    localStorage.getItem("userId") !== divEl.dataset.ownerId;

  return divEl;
}

async function logoutUser(e) {
  e.preventDefault();

  let logoutRequest = await fetch("http://localhost:3030/users/logout", {
    headers: {
      "X-Authorization": localStorage.getItem("token"),
    },
  });

  if (logoutRequest.status === 204) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    document.querySelector("#guest").style.display = "inline";
    document.querySelector(".add").disabled = true;
    document.querySelector("#user").style.display = "none";
  }
}

async function deleteEntry(e) {
  let divCatch = e.currentTarget.parentElement;
  let catchId = divCatch.dataset.id;
  let catchOwnerId = divCatch.dataset.ownerId;

  if (catchOwnerId === localStorage.getItem("userId")) {
    let deleteReq = await fetch(
      `http://localhost:3030/data/catches/${catchId}`,
      {
        method: "DELETE",
        headers: {
          "X-Authorization": localStorage.getItem("token"),
        },
      }
    );
  }

  catchesDivEl.removeChild(divCatch);
}

async function updateEntry(e) {
  let divCatch = e.currentTarget.parentElement;
  let catchId = divCatch.dataset.id;
  let catchOwnerId = divCatch.dataset.ownerId;

  let catchInputs = divCatch.querySelectorAll(".catch input");

  let updatedCatch = {
    angler: catchInputs[0].value,
    weight: catchInputs[1].value,
    species: catchInputs[2].value,
    location: catchInputs[3].value,
    bait: catchInputs[4].value,
    captureTime: catchInputs[5].value,
  };

  if (catchOwnerId === localStorage.getItem("userId")) {
    let updateReq = await fetch(
      `http://localhost:3030/data/catches/${catchId}`,
      {
        method: "PUT",
        headers: {
          "X-Authorization": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCatch),
      }
    );

    let updateRes = await updateReq.json();

    console.log(updateRes);
  }
}
