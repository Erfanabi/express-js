const { validationResult } = require("express-validator");

function checkValidation(req, res, next) {
  const errors = validationResult(req); // دریافت نتیجه اعتبارسنجی

  // اگر هیچ خطایی وجود نداشت، به middleware بعدی برو
  if (errors.isEmpty()) {
    return next();
  }

  let obj = {}; // ذخیره پیام‌های خطا

  // تبدیل خطاها به آبجکت `{ فیلد: پیام خطا }`
  errors.array().forEach((err) => {
    obj[err.param] = err.msg;
  });

  // ارسال پاسخ مناسب
  return res.status(400).json({
    statusCode: 400,
    errors: obj,
    message: "Validation error",
  });
}

module.exports = { checkValidation };