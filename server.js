require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const stripe = require("stripe")(process.env.SECRET_KEY);

app.post("/create-checkout-session/", async (req, res) => {
    console.log(req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "ngn",
          product_data: {
            name: "fakeXStore",
          },
          unit_amount: req.body.price,
        },
        quantity: req.body.quantity,
      },
    ],
    mode: "payment",
    success_url: "https://fakexstore.netlify.app/payment-successfull",
    cancel_url: "https://fakexstore.netlify.app/cart",
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
