const express = require(`express`);
const mongoose = require(`mongoose`);
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

mongoose.set("strictQuery", false);
dotenv.config();

const productRouter = require("./routes/product");
const categoryRouter = require("./routes/product-category");
const reviewRouter = require("./routes/reviews");
const userTypeRouter = require("./routes/user-type");
const userRouter = require("./routes/user");
const customerRouter = require("./routes/customer");
const productOrdersRouter = require("./routes/product-orders");
const ordersRouter = require("./routes/orders");
const adminRouter = require("./routes/administrator");
const refreshToken = require("./routes/refresh-token");
const payment = require("./routes/payment");
const search = require("./routes/search");
const chat = require("./controllers/artificial-intelligence");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", reviewRouter);
app.use("/api", userTypeRouter);
app.use("/api", userRouter);
app.use("/api", customerRouter);
app.use("/api", productOrdersRouter);
app.use("/api", ordersRouter);
app.use("/api", adminRouter);
app.use("/api", refreshToken);
app.use("/api", payment);
app.use("/api", search);
app.get("/api/chat", (req, res) => {
  chat(io, req, res);
});

app.get("/api", (req, res) => {
  res.send("Welcome!");
});
const port = process.env.PORT;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    res.json({ ERROR: error.message });
  }
};
start();
