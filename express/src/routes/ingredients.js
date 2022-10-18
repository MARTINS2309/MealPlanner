const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", (req, res) => {
  var query = req.query.query ?? "100g egg";

  request.get(
    {
      url: "https://api.calorieninjas.com/v1/nutrition?query=" + query,
      headers: {
        "X-Api-Key": process.env.API_key_CalorieNinjas,
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else res.send(body);
    }
  );
  console.log("GET ingredients");
});

module.exports = router;
