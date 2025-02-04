// middleware.js
const userMiddleware = (req, res, next) => {
  console.log(`Middleware Triggered: ${req.method} ${req.originalUrl}`);

  next(); // اجازه عبور به درخواست
};

// Middleware فقط برای `GET /user`
const specificMiddleware = (req, res, next) => {
  console.log('Middleware for GET /user triggered!');

  next(); // اجازه عبور به درخواست
};


module.exports = { userMiddleware, specificMiddleware };
