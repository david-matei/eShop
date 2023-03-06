const Category = require("../models/product-category");

const getAll = async (_req, res) => {
  try {
    const getCats = await Category.find({});
    res.json(getCats);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const post = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("Category needs to have a name");
    }
    const existingCategory = await Category.find({ name: name });
    if (existingCategory.length > 0) {
      throw new Error(`Category ${name}} already exists`);
    }
    const newCat = await Category.create({ name: name });
    res.json({ message: "Category created successfully", newCat: newCat });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleteCat = await Category.findByIdAndDelete({ _id: req.params.id });
    // nu mai trebuie mentionat _id deoarece deja caut dupa _id (findById...) si eu pasez deja id ul din params
    if (!deleteCat) {
      throw new Error("Category not found");
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const getCat = await Category.findById({ _id: req.params.id });
    res.json(getCat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const put = async (req, res) => {
  try {
    const putCat = await Category.findById(req.params.id);
    if (!putCat) {
      await Category.create({ name: req.body });
      res.json({ message: "New Category has been created." });
    } else {
      await putCat.updateOne(req.body);
      res.json({ message: "Category has been updated." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  remove,
  post,
  getOne,
  put,
};
