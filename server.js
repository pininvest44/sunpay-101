require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const logs = [];

const delay = ms => new Promise(r => setTimeout(r, ms));

app.get("/", (req, res) => {
  res.render("index", { logs });
});

app.post("/send", async (req, res) => {
  const { numbers, amount, reference } = req.body;
  const phoneNumbers = numbers.split(/\r?\n/).map(x => x.trim()).filter(Boolean);

  for (const phoneNumber of phoneNumbers) {
    try {
      const response = await axios.post(
        `${process.env.SUNPAY_BASE_URL}/api/v1/payments/stk-push`,
        {
          phoneNumber,
          amount: Number(amount),
          reference
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.SUNPAY_API_KEY}`
          }
        }
      );

      logs.unshift({
        time: new Date().toISOString(),
        phoneNumber,
        status: "SUCCESS",
        response: JSON.stringify(response.data)
      });
    } catch (err) {
      logs.unshift({
        time: new Date().toISOString(),
        phoneNumber,
        status: "FAILED",
        response: err.response?.data ? JSON.stringify(err.response.data) : err.message
      });
    }

    await delay(2000);
  }

  res.redirect("/");
});

app.listen(process.env.PORT || 3000);