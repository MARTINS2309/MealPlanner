const express = require("express");
require("dotenv").config();

console.log(process.env);

const app = express();
const port = 3001;
const apiKey = process.env.API_key_CalorieNinjas;
