const express = require("express");
const db = require("../db");
const auth = require("./auth");

const router = express.Router();

// CREATE CATEGORY
router.post("/", auth, (req, res) => {
  const { name } = req.body;

  db.run(
    "INSERT INTO categories (name, userId) VALUES (?, ?)",
    [name, req.session.userId],
    function(err) {
      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID });
    }
  );
});

// GET ALL CATEGORIES
router.get("/", auth, (req, res) => {
  db.all(
    "SELECT * FROM categories WHERE userId = ?",
    [req.session.userId],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

// DELETE CATEGORY
router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;

  db.run(
    "DELETE FROM categories WHERE id = ? AND userId = ?",
    [id, req.session.userId],
    function(err) {
      if (err) return res.status(500).json(err);

      res.json({ message: "Category deleted" });
    }
  );
});

// UPDATE CATEGORY
router.put("/:id", auth, (req, res) => {
  const { name } = req.body;
  const id = req.params.id;

  db.run(
    "UPDATE categories SET name = ? WHERE id = ? AND userId = ?",
    [name, id, req.session.userId],
    function(err) {
      if (err) return res.status(500).json(err);

      res.json({ message: "Category updated" });
    }
  );
});

module.exports = router;