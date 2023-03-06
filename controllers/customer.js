const Customer = require("../models/customer");

const getAllCustomers = async (_req, res) => {
  try {
    const customers = await Customer.find({});
    if (customers.length === 0) {
      throw new Error("There are no customers yet");
    } else {
      return res.json(customers);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postCustomer = async (req, res) => {
  try {
    const { address, phoneNumber } = req.body;
    if (!address || !phoneNumber) {
      throw new Error("There are missing fields");
    } else {
      await Customer.create({
        address: address,
        phoneNumber: phoneNumber,
        userId: req.user.userId,
      });
      res.json({ message: "Customer created successfully" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const find = await Customer.findById(req.params.id);
    if (!find) {
      throw new Error("No customer found");
    } else {
      await Customer.findByIdAndDelete(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const find = await Customer.findById(req.params.id);
    if (!find) {
      throw new Error("No customer found");
    } else {
      res.json(find);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const findCustomer = await Customer.findById(req.params.id);
    if (!findCustomer) {
      await Customer.create(req.body);
      res.json({ message: "New customer created successfully" });
    } else {
      await Customer.updateOne({ _id: req.params.id }, { $set: req.body });
      res.json({ message: "Customer updated successfully" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = {
  postCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomer,
};
