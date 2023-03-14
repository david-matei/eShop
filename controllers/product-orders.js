const ProductOrders = require("../models/product-orders");
const Product = require("../models/product");
const Orders = require("../models/orders");
// to check if the user ID from the params matches the user ID from the payload of the JWT TOKEN
// that is stored in the req.user object I already made a middleware that checks for that and also checks
// the token for presence and validity

const postProductOrder = async (req, res) => {
  try {
    const { productIds, quantities } = req.body;
    console.log(productIds, quantities);
    const priceAndQuantity = await Product.find({
      _id: { $in: productIds },
    }).select("quantity price");

    let prices = [];
    // Check for invalid quantity
    if (
      quantities.some(
        (quantity) => quantity <= 0 || quantity === "" || quantity === null
      )
    ) {
      throw new Error(
        "Quantity can not be less than or equal to 0, empty or null!"
      );
    }

    let totalPrice = 0;

    for (let i = 0; i < productIds.length; i++) {
      let dbQuantities = priceAndQuantity[i].quantity;
      let dbPrices = priceAndQuantity[i].price;

      totalPrice += dbPrices * quantities[i];

      prices.push(dbPrices);

      // verificare stoc
      if (dbQuantities - quantities[i] < 0) {
        throw new Error("Not enough quantity available.");
      }
      await Product.findByIdAndUpdate(productIds[i], {
        $inc: { quantity: -quantities[i] },
      });
    }

    const productOrder = new ProductOrders({
      productIds,
      quantities,
      prices,
      userId: req.user.userId,
      totalPrice,
    });
    await productOrder.save();
    const order = await Orders.create({
      productOrderId: productOrder._id,
      totalAmount: totalPrice,
      userId: req.user.userId,
    });
    // this will redirect you to the payment page.
    res.json({
      message:
        "Order was successful and you will be redirected to the payment page.",
      "product order": productOrder,
      "new order": order,
    });
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
