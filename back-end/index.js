const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const path = require("path");

const Product = require("./Router/product");

env.config();

const app = express();

const server = app.listen(process.env.PORT, () => {
  console.log(`listen on port ${process.env.PORT}`);
});

app.use("/uploadImg", express.static(path.join(__dirname, "/uploadImg")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "300mb" }));
app.use(cors());

app.use("/api", Product);