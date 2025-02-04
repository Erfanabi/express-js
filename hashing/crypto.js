const crypto = require('crypto');

// تابع برای هش کردن کلمه عبور
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');  // تولید salt تصادفی
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");  // هش کردن کلمه عبور
  const newHash = `$2s.${salt}.${hash}`;  // ذخیره کردن salt و hash در یک رشته
  return newHash;
}

// تابع برای تایید کردن کلمه عبور وارد شده با هش ذخیره شده
function verifyHashPassword(password, hashPassword) {
  const salt = hashPassword.split(".")?.[1];  // استخراج salt از هش ذخیره شده
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");  // هش کردن کلمه عبور وارد شده
  const newHash = `$2s.${salt}.${hash}`;  // ساخت دوباره هش جدید
  return (newHash === hashPassword);  // مقایسه هش‌ها
}

// تست تابع‌ها
const hashed = hashPassword("12345");
const result = verifyHashPassword("12345", hashed);  // این باید true برگرداند
console.log(result);  // باید true باشد

const resultWrong = verifyHashPassword("wrongPassword", hashed);  // این باید false برگرداند
console.log(resultWrong);  // باید false باشد
