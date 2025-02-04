const fs = require('fs');
const crypto = require('crypto');

// تابع برای هش کردن محتوای فایل و نوشتن آن در یک فایل دیگر
function hashFileToFile(inputFile, outputFile) {
  // ایجاد یک hash با استفاده از SHA-256
  const hash = crypto.createHash('md5');

  // خواندن فایل ورودی به صورت Stream
  const fileStream = fs.createReadStream(inputFile);

  // اضافه کردن محتوای فایل به هش
  fileStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  fileStream.on('end', () => {
    // وقتی خواندن فایل تمام شد، هش را محاسبه می‌کنیم
    const fileHash = hash.digest('hex');

    // نوشتن هش در فایل خروجی (hash.txt)
    fs.writeFile(outputFile, fileHash, (err) => {
      if (err) {
        console.error('Error writing hash to file:', err);
      } else {
        console.log('Hash has been written to', outputFile);
      }
    });
  });

  fileStream.on('error', (err) => {
    console.error('Error reading file:', err);
  });
}

// استفاده از تابع برای هش کردن فایل index.txt و ذخیره در hash.txt
const inputFile = 'index.txt';  // مسیر فایل ورودی (index.txt)
const outputFile = 'hash.txt';  // مسیر فایل خروجی (hash.txt)

hashFileToFile(inputFile, outputFile);
