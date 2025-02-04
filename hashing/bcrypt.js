const bcrypt = require('bcryptjs');

// تابع برای هش کردن پسورد
async function hashPassword(password) {
  try {
    // تولید نمک (salt) و هش کردن پسورد با نمک
    const salt = await bcrypt.genSalt(10);  // 10 سطح پیچیدگی
    const hashedPassword = await bcrypt.hash(password, salt);  // هش کردن کلمه عبور
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

// تابع برای تایید کردن پسورد
async function verifyPassword(password, hashedPassword) {
  try {
    // مقایسه کلمه عبور وارد شده با هش ذخیره شده
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error verifying password:', error);
  }
}

// مثال استفاده
async function example() {
  const password = 'mySecurePassword123';

  // مرحله 1: هش کردن پسورد
  const hashedPassword = await hashPassword(password);
  console.log('Hashed Password:', hashedPassword);

  // مرحله 2: تایید پسورد
  const isMatch = await verifyPassword('mySecurePassword123', hashedPassword);
  console.log('Password match:', isMatch);  // این باید true باشد

  const isWrongMatch = await verifyPassword('wrongPassword', hashedPassword);
  console.log('Password match:', isWrongMatch);  // این باید false باشد
}

example();
