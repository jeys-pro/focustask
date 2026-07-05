const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

/**
 * IMPORTANT: permet de gérer correctement les cookies en dev
 */
app.set("trust proxy", 1);

app.use(express.json());

/**
 * CORS : autorise ton front (Live Server)
 */
app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}));

/**
 * SESSION CONFIG (FIX COOKIE)
 */
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

/**
 * ROUTES
 */
app.use("/auth", require("./routes/auth"));
app.use("/categories", require("./routes/categories"));
app.use("/tasks", require("./routes/tasks"));

/**
 * SERVER START
 */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});