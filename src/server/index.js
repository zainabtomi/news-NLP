var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const { analyzeURL } = require("./URLAnalyzer");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

const API_KEY = process.env.API_KEY;
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/", async (req, res) => {
  const url = req.body.url;
  const analysis = await analyzeURL(url, API_KEY);
  res.json(analysis);
});

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});
