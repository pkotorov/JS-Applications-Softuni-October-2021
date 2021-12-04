let loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", loginUser);

let userDiv = document.querySelector('#user');
userDiv.style.display = 'none';

async function loginUser(e) {
  e.preventDefault();

  let formData = new FormData(loginForm);
  let email = formData.get("email");
  let password = formData.get("password");
  let loginUser = {
    email: email,
    password: password,
  };

  try {
    let loginRequest = await fetch("http://localhost:3030/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    });

    if (loginRequest.status === 403) {
      loginForm.querySelector("p").textContent =
        "Login or password don't match";
    } else {
      let loginResponse = await loginRequest.json();
      console.log(loginResponse);

      localStorage.setItem("token", loginResponse.accessToken);
      localStorage.setItem("userId", loginResponse._id);

      location.assign('./index.html');
    }
  } catch {
    loginForm.querySelector("p").textContent = "Something went wrong";
  }

  loginForm.reset();
}

