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

app.get("/insert-many", async (req, res) => {
  const blogs = [
    { title: "مقاله اول", text: "متن مقاله اول", author: "علی" },
    { title: "مقاله دوم", text: "متن مقاله دوم", author: "حسین" },
    { title: "مقاله سوم", text: "متن مقاله سوم", author: "مریم" },
  ];

  try {
    const result = await BlogModel.insertMany(blogs);
    console.log("✅ مقالات با موفقیت وارد شدند:", result);
  } catch (error) {
    console.error("❌ خطا در وارد کردن مقالات:", error);
  }
})

app.get("/blogs", async (req, res) => {
  try {
    const result = await BlogModel.find();
    res.status(200).json({ statusCode: 200, documentCount: result.length, blogs: result });
  } catch (error) {
    console.error("❌ خطا در وارد کردن مقالات:", error);
  }
})

app.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    const result = await BlogModel.findOne({ _id: blogId });
    res.status(200).json({ statusCode: 200, blogs: result });
  } catch (error) {
    console.error("❌ خطا", error);
  }
})


app.use(NotFoundError)
app.use(ErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})