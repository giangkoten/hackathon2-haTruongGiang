const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const useTodos = require("./routes/todos.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("public"));

app.use("/api/v1/todos", useTodos);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
