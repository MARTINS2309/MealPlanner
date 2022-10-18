const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("recepies");
  console.log("GET recepies");
});

module.exports = router;
