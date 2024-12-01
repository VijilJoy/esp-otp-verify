const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
var generated_otp = "";

app.get("/", (req, res) => {
  res.redirect("/generate");
});
var timer;
app.get("/generate", (req, res) => {
  if (generated_otp != "") return res.status(200).send(`${generated_otp}`);
  generated_otp = Math.floor(1000 + Math.random() * 9000);
  clearTimeout(timer);
  timer = setTimeout(() => {
    generated_otp = "";
    console.log("OTP Expired ");
  }, 2 * 60000);

  res.status(200).send(`${generated_otp}`);
});

app.get("/verify/:otp", (req, res) => {
  const otp = req.params.otp;
  console.log(otp);
  if (otp == generated_otp) {
    res.status(200).send("Verified");
    generated_otp = "";
  } else {
    res.status(400).send("Wrong OTP");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
