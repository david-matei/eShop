const Orders = require("../models/orders");

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

//post a fost sters pentru acelasi motiv din routes/orders

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
};
