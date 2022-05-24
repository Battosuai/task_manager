const express = require("express");
const app = express();
require("dotenv").config();

const tasks = require("./routes/tasks");

const connectDb = require("./db/connection");

const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.get("/hello", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

app.use((req, res) => {
  res.json({ msg: "Invalid route", success: false });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server started at Port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
