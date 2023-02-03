const User = require("../models/User");

// Retrieve all customers from the database.
exports.index = async (req, res) => {
  try {
    let customers = await User.find({
      role: 2,
    });
    res.status(200).json({
      message: "Customers fetched successfully!",
      data: customers,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Find a single customer with an id
exports.view = async (req, res) => {
  try {
    let customer = await User.findById(req.params.id);
    res.status(200).json({
      message: "Customer fetched successfully!",
      data: customer,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Delete a customer with the specified id in the request:
exports.delete = async (req, res) => {
  try {
    let customer = await User.findByIdAndRemove(req.params.id);
    if (!customer) {
      return res.status(404).send({
        message: "Customer not found with id " + req.params.id,
      });
    }
    res.send({ message: "Customer deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

// Activate a user by the id in the request
exports.activate = async (req, res) => {

  try {

    let updatedCustomer = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: 1
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).send({
        message: "User not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedCustomer,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};


// deActivate a user by the id in the request
exports.deActivate = async (req, res) => {

  try {

    let updatedCustomer = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: 0
      },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).send({
        message: "User not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedCustomer,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};