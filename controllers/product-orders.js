const ProductOrders = require("../models/product-orders");
const Product = require("../models/product");

// to check if the user ID from the params matches the user ID from the payload of the JWT TOKEN
// that is stored in the req.user object I already made a middleware that checks for that and also checks
// the token for presence and validity

const postProductOrder = async (req, res) => {
  try {
    const { productIds, quantities } = req.body;
    // prices nu le iau din req.body
    // le voi lua din baza de date
    // todo: modifica codul pentru a lua preturile din Product document
    const products = await Product.find({ _id: { $in: productIds } }).select(
      "quantity"
    );

    const prices = await Product.find({ _id: { $in: productIds } }).select(
      "price"
    );

    for (let i = 0; i < products.length; i++) {
      if (products[i].quantity < quantities[i]) {
        throw new Error(
          `Insufficient quantity for product with ID ${productIds[i]}`
        );
      }
    }

    for (let i = 0; i < products.length; i++) {
      await Product.findByIdAndUpdate(productIds[i], {
        $inc: { quantity: -quantities[i] },
      });
    }
    // as putea sa fac cu .create() ca e mai eficient
    const productOrder = new ProductOrders({
      productIds,
      quantities,
      prices,
      userId: req.user.userId,
    });

    await productOrder.save();

    res.status(201).json({ message: "Product order created" });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
};

const getProductOrders = async (_req, res) => {
  try {
    const productOrders = await ProductOrders.find({ userId: req.user.userId });
    if (productOrders.length === 0) {
      throw new Error("No product orders found");
    }
    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const singleOrder = await ProductOrders.find({
      _id: req.params.productOrderId,
      userId: req.user.userId,
    });
    res.json(singleOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const remove = await ProductOrders.findOneAndDelete({
      _id: req.params.productOrderId,
      userId: req.user.userId,
    });
    res.json({ message: "Product Order deleted successfully", remove });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const update = await ProductOrders.findByIdAndUpdate(
      { _id: req.params.productOrderId, userId: req.user.userId },
      req.body
    );
    res.json({ message: "Product Order updated successfully", update });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postProductOrder,
  getProductOrders,
  getSingleOrder,
  deleteOrder,
  updateOrder,
};
