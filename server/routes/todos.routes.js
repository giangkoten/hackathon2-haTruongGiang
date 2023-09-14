const express = require("express");
const router = express.Router();
const db = require("../utils/database");

//Get all
router.get("/", async (req, res) => {
  try {
    let data = await db.execute("SELECT * FROM tasks");
    let row = data[0];
    res.json({
      msessage: "data-todos",
      data: row,
    });
  } catch (error) {
    console.log(error);
  }
});
//delete
router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await db.execute(`DELETE FROM tasks WHERE (task_id = ${id});
    `);
    res.json({
      msessage: "delete success",
    });
  } catch (error) {
    console.log(error);
  }
});
//create
router.post("/", async (req, res) => {
  let { name } = req.body;
  try {
    await db.execute(`INSERT INTO tasks (task_name, status) VALUES (?, 1);`, [
      name,
    ]);

    res.json({
      message: `Post success`,
    });
  } catch (error) {
    console.log(error);
  }
});
//patch
router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  try {
    await db.execute(`UPDATE tasks SET status = ? WHERE (task_id = ?);`, [
      status,
      id,
    ]);
    res.json({
      message: "Update success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
