// controllers/blog.controller.js

class BlogController {
  // دریافت لیست تمامی مقالات
  static getAllBlogs(req, res) {
    res.send('List of all blogs');
  }

  // دریافت اطلاعات یک مقاله خاص
  static getBlogById(req, res) {
    res.send(`Blog ID: ${req.params.id}`);
  }

  // ایجاد یک مقاله جدید
  static createBlog(req, res) {
    res.send('New blog created');
  }

  // حذف یک مقاله
  static deleteBlog(req, res) {
    res.send(`Blog ID ${req.params.id} deleted`);
  }
}

module.exports = BlogController;
