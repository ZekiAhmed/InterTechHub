import express from "express";

const app = express();

const hobby = ["Reading book", "Walking", "Riding horse"];

app.get("/", (req, res) => {
  res.status(200).send("Use one of this routes /name, /hobby or /dream");
});
app.get("/name", (req, res) => {
  res.status(200).send("Zeki Ahmed");
});
app.get("/hobby", (req, res) => {
  res.status(200).json(hobby);
});
app.get("/dream", (req, res) => {
  res.status(200).json({ message: "I want to be senior backend engineer." });
});

app.listen(3000, () => {
  console.log("Backend Server Is Runing!!");
});
