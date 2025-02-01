const { body } = require("express-validator");
const loginValidators = () => [
  body("email").isEmail().withMessage("ایمیل معتبر وارد کنید"),
  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("رمز عبور باید بین 6 تا 16 کاراکتر باشد"),
];

const registerValidator = () => [
  body("fullname")
    .notEmpty().withMessage("نام و نام خانوادگی الزامی است")
    .isLength({ min: 3 }).withMessage("نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد"),

  body("age")
    .notEmpty().withMessage("سن الزامی است")
    .isInt({ min: 18, max: 99 }).withMessage("سن باید بین 18 تا 99 سال باشد"),

  // body("phone")
  //   .notEmpty().withMessage("شماره تلفن الزامی است")
  //   .matches(/^09\d{9}$/).withMessage("شماره تلفن معتبر نیست (باید 11 رقم و با 09 شروع شود)"),

  body("email")
    .isEmail().withMessage("ایمیل معتبر وارد کنید")
    .normalizeEmail(), // نرمال‌سازی ایمیل

  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("رمز عبور باید بین 6 تا 16 کاراکتر باشد")
    .matches(/\d/).withMessage("رمز عبور باید حداقل یک عدد داشته باشد")
    .matches(/[A-Z]/).withMessage("رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
    .matches(/[a-z]/).withMessage("رمز عبور باید حداقل یک حرف کوچک داشته باشد"),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("رمز عبور و تکرار آن مطابقت ندارند");
      }
      return true;
    }),
];


module.exports = { loginValidators, registerValidator };