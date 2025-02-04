const express = require('express');
const BlogController = require('../controllers/blog.controller');
const router = express.Router();

// دریافت لیست تمامی مقالات
router.get('/', BlogController.getAllBlogs);

// دریافت اطلاعات یک مقاله خاص
router.get('/:id', BlogController.getBlogById);

// ایجاد یک مقاله جدید
router.post('/', BlogController.createBlog);

// حذف یک مقاله
router.delete('/:id', BlogController.deleteBlog);

module.exports = { blogRouter: router };
