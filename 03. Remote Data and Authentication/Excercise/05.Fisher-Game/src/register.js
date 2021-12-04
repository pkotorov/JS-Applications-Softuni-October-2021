let registerForm = document.querySelector("main #register");
registerForm.addEventListener("submit", registerUser);

async function registerUser(e) {
  e.preventDefault();

  let formData = new FormData(registerForm);
  let email = formData.get("email");
  let password = formData.get("password");
  let repeatPassword = formData.get("rePass");

  if (password !== repeatPassword) {
    registerForm.querySelector("p").textContent = "Passwords do not match.";
    return;
  }

  let registerUser = {
    email: email,
    password: password,
  };

  try {
    let registerRequest = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUser),
    });

    let registerResponse = await registerRequest.json();
    console.log(registerResponse);
    localStorage.setItem('token', registerResponse.accessToken);
    localStorage.setItem('userId', registerResponse._id);

    location.assign('./index.html');
  } catch {
    console.error('Error');
  }
}
