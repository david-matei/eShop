const Product = require("../models/product");

const getAll = async (_req, res) => {
  const getProducts = await Product.find({});
  if (getProducts.length === 0) {
    res.json({ message: "No products Found!" });
  }
  res.json(getProducts);
};

const post = async (req, res) => {
  try {
    const { name, categoryId, price, quantity } = req.body;
    if (!name || !categoryId || !price || !quantity) {
      throw new Error("Missing Information");
    }
    const product = await Product.create({
      name: name,
      categoryId: categoryId,
      price: price,
      quantity: quantity,
    });
    res.json({ message: `Product has been created successfully`, product });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllFromCategory = async (req, res) => {
  try {
    const productsWithinCategory = await Product.find({
      categoryId: req.params.categoryId,
    });
    if (productsWithinCategory.length === 0) {
      throw new Error("No products within this category");
    } else {
      return res.json(productsWithinCategory);
    }
  } catch (error) {
    res.json({ message: `Error: ${error.message}` });
  }
};

const getOne = async (req, res) => {
  try {
    const getProduct = await Product.findOne({ _id: req.params.id });
    if (!getProduct) {
      throw new Error(`Product not found`);
    } else {
      res.json(getProduct);
    }
  } catch (error) {
    res.json({ message: `Error: ${error.message}` });
  }
};

const remove = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      throw new Error("Product not found");
    } else {
      res.json({ message: `Product deleted successfully` });
    }
  } catch (error) {
    res.json({ message: `Error: ${error.message}` });
  }
};

const put = async (req, res) => {
  try {
    const updateProduct = await Product.findById(req.params.id);
    if (!updateProduct) {
      await Product.create(req.body);
      return res.json({ message: `Product created successfully` });
    } else {
      await Product.updateOne({ _id: req.params.id }, { $set: req.body });
      return res.json({ message: `Product updated successfully` });
    }
  } catch (error) {
    res.json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  getAll,
  getAllFromCategory,
  getOne,
  post,
  remove,
  put,
};
