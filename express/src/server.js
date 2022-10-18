const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ingredientsRouter = require("./routes/ingredients");
const recepiesRouter = require("./routes/recepies");
const mealplansRouter = require("./routes/mealplans");

app.use("/ingredients", ingredientsRouter);
app.use("/recepies", recepiesRouter);
app.use("/mealplans", mealplansRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
