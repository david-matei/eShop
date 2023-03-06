const UserType = require("../models/user-type");

const post = async (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(400).json({ error: "Fill in the details" });
  }
  try {
    const userType = await UserType.create({ user });
    return res
      .status(201)
      .json({ message: "User created successfully", userType });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const users = await UserType.find({});
    if (users.length === 0) {
      return res.status(404).json({ error: "No userType found" });
    }
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const user = await UserType.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const user = await UserType.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const putOne = async (req, res) => {
  try {
    const user = await UserType.findById(req.params.id);
    if (!user) {
      const newUserType = await UserType.create(req.body);
      return res.status(201).json({
        message: "UserType created successfully",
        userType: newUserType,
      });
    }
    await UserType.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ message: "UserType updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getOne,
  deleteOne,
  putOne,
  post,
};
