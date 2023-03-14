const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productOrders = new Schema(
  {
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    ],
    quantities: [
      {
        type: Number,
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prices: {
      type: Array,
      required: true,
    },
    payed: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ProductOrders = mongoose.model("ProductOrders", productOrders);

module.exports = ProductOrders;
