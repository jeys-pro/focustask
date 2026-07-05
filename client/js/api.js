const API_URL = "http://localhost:3000";

async function request(path, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(API_URL + path, options);
  return res.json();
}