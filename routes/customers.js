const express = require("express");
const router = express.Router();
const customers = require("../controllers/CustomersController");

// Retrieve all customers
router.get("/index", customers.index);

// Retrieve a single customer with id
router.get("/view/:id", customers.view);

// Delete a single customer with id
router.delete("/delete/:id", customers.delete);

// Activate a single customer with id
router.get("/activate/:id", customers.activate);

// deActivate a single customer with id
router.get("/deActivate/:id", customers.deActivate);

module.exports = router;
