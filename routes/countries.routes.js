const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/countries.controller");

router.post("/create",  countriesController.create);
router.get("/index", countriesController.index);

module.exports = router;
 