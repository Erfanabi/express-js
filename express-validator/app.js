const path = require("path");
const express = require('express')
const { NotFoundError, ErrorHandler } = require("./utils/errorHandler");
const app = express()
const port = 3000
const { body, validationResult } = require("express-validator");
const { BlogModel } = require("./model/blog.model");
const { loginValidators, registerValidator } = require("./validators/auth.validators");
const { checkValidation } = require("./middleware/validator");


app.use(express.json()); // 👈 این middleware داده‌ها را پردازش می‌کند


require(path.join(__dirname, "config", "mongo.config"));

app.post("/body", loginValidators(), checkValidation, (req, res) => {
  const error = validationResult(req)
  res.send(error);
});

app.post("/register", registerValidator(), checkValidation, (req, res) => {
  // ✅ در صورتی که خطایی نباشد، پیام موفقیت را ارسال می‌کنیم
  res.status(200).json({
    statusCode: 200,
    message: "✅ ثبت‌نام با موفقیت انجام شد!",
  });
});


app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})