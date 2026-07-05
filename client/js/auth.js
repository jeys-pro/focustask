async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await request("/auth/register", "POST", {
    email,
    password
  });

  alert(res.message || res.error);
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await request("/auth/login", "POST", {
    email,
    password
  });

  if (res.error) {
    document.getElementById("error").innerText = res.error;
    return;
  }

  window.location.href = "app.html";
}

async function logout() {
  await request("/auth/logout", "POST");
  window.location.href = "login.html";
}