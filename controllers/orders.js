const Orders = require("../models/orders");
const ProductOrders = require("../models/product-orders");
const Product = require("../models/product");

const getAllOrders = async (_req, res) => {
  try {
    const orders = await Orders.find({ userId: req.user.userId });
    if (orders.length === 0) {
      throw new Error("No orders found");
    } else {
      return res.json(orders);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const postOrder = async (req, res) => {
  try {
    const { customerId } = req.body;
    if (!customerId) {
      throw new Error("Fill in order details");
    }
    // ----------------------------------------------------------------
    // The optional chaining operator (?) will return undefined if order is null or undefined, instead of throwing an error when you try to access its properties.
    // This can be useful to prevent errors when working with potentially undefined or null values.
    // ----------------------------------------------------------------

    const order = await ProductOrders.findById(req.params.productOrderId);
    const quantities = order?.quantities;

    const selectIds = await ProductOrders.findById(
      req.params.productOrderId
    ).select("productIds");

    const productIds = selectIds.productIds;
    console.log(productIds);

    const prices = await Product.find({
      _id: { $in: productIds },
    }).select("price");

    console.log(prices[0].price);

    let totalPrice = 0;
    // apoi va lua fiecare index pentru preturi si cantitati si va inmulti pretul cu cantitatea
    // si va aduna rezultatul la total price pana la ultimul pret si cantitate
    for (let i = 0; i < quantities.length; i++) {
      let pricePerProduct = prices[i].price * quantities[i];
      totalPrice += pricePerProduct;
    }
    // creez un nou order cu id-ul comenzii produselor ca sa stiu ce produse au fost comandate
    // id-ul clientului
    // si totalul comenzii care este egal cu pretul calculat mai sus
    const createOrder = await Orders.create({
      productOrderId: req.params.productOrderId,
      customerId,
      totalAmount: totalPrice,
      userId: req.user.userId,
    });
    res.json({ message: "Order created successfully", createOrder });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const getOrder = await Orders.findOne({
      _id: req.params.orderId,
      userId: req.user.userId,
    });
    if (!getOrder) {
      throw new Error(`Order number ${req.params.orderId} not found`);
    } else {
      res.json(getOrder);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
// admin only  "Trebuie sa incep sa implementez adimn-only accessibility"
// implementat!
const deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await Orders.findOneAndDelete({
      _id: req.params.orderId,
      userId: req.user.userId,
    });
    res.json({
      message: "Order deleted successfully",
      Deleted: deleteOrder._id,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderId);
    if (!order) {
      // n ai cum sa updatezi o comanda care nu exista
      throw new Error("Order not found");
    }
    const orderNEW = await Orders.updateOne(
      { _id: req.params.orderId },
      { $set: req.body }
    );
    res.json({ newOrder: orderNEW });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateOrder,
  postOrder,
};
