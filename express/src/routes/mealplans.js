const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("mealplans");
  console.log("GET mealplans");
});

module.exports = router;
