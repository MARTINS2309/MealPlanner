const express = require("express");
const router = express.Router();
const request = require("request");

router.get("/", (req, res) => {
  console.log("GET ingredients");
});

router
  .route("/:id")
  .get((req, res) => {
    request.get(
      {
        url:
          "https://api.calorieninjas.com/v1/nutrition?query=" + req.params.id,
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
  })
  .put((req, res) => {})
  .delete((req, res) => {});

router.param("id", (req, res, next, id) => {
  console.log(`ingredient id:${id}`);
  next();
});

module.exports = router;
