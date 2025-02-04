const express = require('express');
const serveFavicon = require('serve-favicon'); // ایمپورت پکیج serve-favicon
const { userMiddleware, specificMiddleware } = require("../middleware/middleware");
const { getAllUsers, getUserById, createUser } = require("../controllers/user.controller");
const path = require("path");
const router = express.Router();


router.use(serveFavicon(path.join(__dirname, '../', 'download.png')));

console.log(__dirname)

// اعمال Middleware روی همه مسیرهای `/user`
router.use(userMiddleware);

// مسیرهای مربوط به `/user`
router.get('/', specificMiddleware, getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

module.exports = { userRouter: router };
