const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// استفاده از cookie-parser برای پردازش کوکی‌ها
// استفاده از cookie-parser با کلید مخفی برای امضا
app.use(cookieParser('5dd6f4b8ea2eda324a5629325e8868a8'));

// این روت برای تنظیم کوکی است
app.get('/set-cookie', (req, res) => {
  // تنظیم کوکی user با مقدار 'JohnDoe' و عمر 1 روزه
  res.cookie('user', 'JohnDoe', {
    maxAge: 24 * 60 * 60 * 1000,   // یک روز
    httpOnly: true,                // فقط از طریق HTTP قابل دسترسی است
    secure: true,                  // فقط از طریق HTTPS ارسال می‌شود
    // sameSite: 'Strict',            // فقط از همان دامنه ارسال می‌شود
    // path: '/login',                // فقط در مسیر /login قابل دسترسی است
    signed: true                   // کوکی امضا شده است
  });
  res.cookie("nodejs", "typescript")
  res.send('Cookie has been set');
});

// این روت بدون استفاده از cookie-parser است
app.get('/home', (req, res) => {
  res.send('Home route without cookies');
});

// این روت برای خواندن کوکی است
app.get('/login', (req, res) => {
  // خواندن کوکی 'user'
  const userCookie = req.cookies;
  const signedCookies = req.signedCookies;  // برای کوکی‌های امضا شده از req.signedCookies استفاده می‌کنیم

  // must *** signed : true ***

  // بررسی اینکه آیا کوکی وجود دارد یا نه
  // if (userCookie || signedCookies) {
  res.send({ userCookie, signedCookies });
  // } else {
  //   res.send('No user cookie found');
  // }
});

app.get('/clear-cookie', (req, res) => {
  // حذف کوکی
  res.clearCookie('user');
  res.send('Cookie has been cleared');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
