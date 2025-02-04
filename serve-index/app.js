const express = require('express')
const serveIndex = require('serve-index');
const path = require("path");
const app = express()
const port = 3000

// مسیر پوشه‌ای که می‌خواهید فایل‌ها را نمایش دهید
const directoryPath = path.join(__dirname, 'public/ftp');

// استفاده از serve-index برای نمایش محتویات پوشه
app.use('/ftp', express.static(directoryPath), serveIndex(directoryPath, { 'icons': true }));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
