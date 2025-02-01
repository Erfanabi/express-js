const multer = require('multer');
const path = require('path');

// تنظیمات ذخیره‌سازی روی دیسک
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ذخیره در پوشه "uploads"
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// فیلتر کردن فقط فایل‌های تصویری
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedTypes.test(file.mimetype);
//
//   if (extName && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error('فقط فایل‌های تصویری مجاز هستند!'), false);
//   }
// };
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  const extName = allowedExtensions.includes(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedMimeTypes.includes(file.mimetype);

  if (extName && mimeType) {
    cb(null, true); // فایل مجاز است
  } else {
    cb(new Error('❌ فقط فایل‌های تصویری مجاز هستند!'), false); // فایل غیرمجاز
  }
};


// ایجاد Middleware برای Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // محدودیت حجم ۵ مگابایت
  fileFilter: fileFilter
});

module.exports = upload;
