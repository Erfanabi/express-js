const express = require('express');
const upload = require('./middleware/multer'); // فایل تنظیمات Multer
const fs = require('fs');
const { ErrorHandler, NotFoundError } = require("./utils/errorHandler");

const app = express();
const port = 3000;

// ایجاد پوشه آپلود در صورت نبودن
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// مسیر آپلود یک فایل
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('هیچ فایلی آپلود نشد!');
  }
  res.send(`✅ فایل با موفقیت آپلود شد: ${req.file.filename}`);
});

// مسیر آپلود چند فایل
app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('❌ هیچ فایلی آپلود نشد!');
  }
  res.send(`✅ ${req.files.length} فایل با موفقیت آپلود شد!`);
});

app.use(ErrorHandler)
app.use(NotFoundError)


// اجرای سرور
app.listen(port, () => {
  console.log(`🚀 سرور روی پورت ${port} اجرا شد: http://localhost:${port}`);
});
