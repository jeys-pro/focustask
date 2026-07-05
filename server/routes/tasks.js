const express = require("express");
const router = express.Router();

const db = require("../db");
const auth = require("../middleware/auth");

/**
 * CREATE TASK
 */
router.post("/", auth, (req, res) => {
  console.log("SESSION USER ID:", req.session.userId);
  const {
    title,
    description,
    deadline,
    type,
    priority,
    status,
    categoryId
  } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title required" });
  }

  db.run(
    `INSERT INTO tasks 
    (title, description, deadline, type, priority, status, categoryId, userId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      deadline,
      type,
      priority || "medium",
      status || "todo",
      categoryId || null,
      req.session.userId
    ],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID });
    }
  );
});

/**
 * GET ALL TASKS (with filters + sorting)
 */
router.get("/", auth, (req, res) => {
  const { status, priority, categoryId, sort } = req.query;

  let query = "SELECT * FROM tasks WHERE userId = ?";
  let params = [req.session.userId];

  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  if (priority) {
    query += " AND priority = ?";
    params.push(priority);
  }

  if (categoryId) {
    query += " AND categoryId = ?";
    params.push(categoryId);
  }

  if (sort === "deadline_asc") {
    query += " ORDER BY deadline ASC";
  } else if (sort === "deadline_desc") {
    query += " ORDER BY deadline DESC";
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json(rows);
  });
});

/**
 * UPDATE TASK
 */
router.put("/:id", auth, (req, res) => {
  const taskId = req.params.id;

  const {
    title,
    description,
    deadline,
    type,
    priority,
    status,
    categoryId
  } = req.body;

  db.run(
    `UPDATE tasks 
     SET title=?, description=?, deadline=?, type=?, priority=?, status=?, categoryId=?
     WHERE id=? AND userId=?`,
    [
      title,
      description,
      deadline,
      type,
      priority,
      status,
      categoryId,
      taskId,
      req.session.userId
    ],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ message: "Task updated" });
    }
  );
});

/**
 * DELETE TASK
 */
router.delete("/:id", auth, (req, res) => {
  const taskId = req.params.id;

  db.run(
    "DELETE FROM tasks WHERE id = ? AND userId = ?",
    [taskId, req.session.userId],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ message: "Task deleted" });
    }
  );
});

module.exports = router;