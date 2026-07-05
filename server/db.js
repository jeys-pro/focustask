const sqlite3 = require("sqlite3").verbose();

// ✅ connexion DB
const db = new sqlite3.Database("./database.db");

// ✅ activer foreign keys
db.run("PRAGMA foreign_keys = ON");

// ================= USERS =================
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // ================= CATEGORIES =================
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      userId INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);

  // ================= TASKS =================
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      deadline TEXT,
      type TEXT,
      priority TEXT,
      status TEXT,
      categoryId INTEGER,
      userId INTEGER,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(categoryId) REFERENCES categories(id)
    )
  `);
});

module.exports = db;