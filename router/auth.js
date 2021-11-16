const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hello world from router js</h1>");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  res.json({ messge: req.body });
  res.send("<h1>My Register Router</h1>");
});

module.exports = router;
