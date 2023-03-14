const ProductOrders = require("../models/product-orders");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/payment");

const payment = async (req, res) => {
  try {
    const productOrder = await ProductOrders.findById(req.params.id);
    const totalPriceInRon = productOrder.totalPrice;
    const totalPriceInUsdCents = (totalPriceInRon / 4.58).toFixed(2);
    const paymentIntent = stripe.paymentIntents.create({
      amount: totalPriceInUsdCents * 100,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
      receipt_email: req.user.email,
    });
    res.json({ client_secret: paymentIntent["client_secret"] });

    const paymentIntentResult = await stripe.paymentIntents.retrieve(
      paymentIntent.id
    );

    if (paymentIntentResult.status !== "succeeded") {
      throw new Error("Payment failed.");
    }
    // in momentul asta tranzactia este valida
    await ProductOrders.findByIdAndUpdate(req.params.id, {
      $set: { payed: true },
    });
    await Payment.create({
      userId: req.user.userId,
      totalAmount: totalPrice,
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = payment;
