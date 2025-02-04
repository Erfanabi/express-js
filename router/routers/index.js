const express = require('express');
const { userRouter } = require("./user.router");
const { blogRouter } = require("./blog.router");
const router = express.Router();

router.use('/user', userRouter); // اعمال تمامی مسیرهای users.js به '/users'
router.use('/blog', blogRouter); // اعمال مسیرهای مربوط به وبلاگ


module.exports = { allRouters: router };
