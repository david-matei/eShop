const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
