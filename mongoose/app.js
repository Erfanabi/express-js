const path = require("path");
const express = require('express')
const { NotFoundError, ErrorHandler } = require("./utils/errorHandler");
const app = express()
const port = 3000

app.use(express.json()); // 👈 این middleware داده‌ها را پردازش می‌کند


require(path.join(__dirname, "config", "mongo.config"));
const { BlogModel } = require("./model/blog.model");

app.get("/", (req, res) => {
  res.send("index page");
})

app.post("/create", async (req, res, next) => {
  try {
    const { title, text } = req.body;

    // بررسی اعتبار داده‌ها (اختیاری اما توصیه‌شده)
    if (!title || !text) {
      return res.status(400).json({ error: "عنوان و متن اجباری هستند!" });
    }

    // ایجاد سند جدید
    const result = await BlogModel.create({ title, text });

    res.status(201).json(result); // 201 => ایجاد موفقیت‌آمیز
  } catch (error) {
    // next(error);  // پاس می دیم به میدلویر errorHandler
    res.status(500).json({ error: "مشکلی در سرور پیش آمد!", details: error.message });
  }
});

app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})