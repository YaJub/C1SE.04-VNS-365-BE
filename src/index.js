const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./database/sequelize");
const { usersRouter } = require("./routes/users.router");
const {
  errorResponseMiddleware,
  loggerErrorMiddleware,
} = require("./middlewares/handle-error.middleware");
const { serviceRouter } = require("./routes/service.router");
const { paymentRouter } = require("./routes/payment.router");
const { orderRouter } = require("./routes/order.router");
const cors = require("cors");
const { commentRouter } = require("./routes/comment.router");
const app = express();
const port = 4000;

const corOptions = {
  origin: "http://localhost:3000",
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corOptions));
app.use("/user", usersRouter);
app.use("/service", serviceRouter);
app.use("/api/payment", paymentRouter);
app.use("/order", orderRouter);
app.use("/comment", commentRouter)

app.use(loggerErrorMiddleware);
app.use(errorResponseMiddleware);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database");
  });
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
