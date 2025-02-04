// controllers/user.controllers.js

// دریافت لیست کاربران
const getAllUsers = (req, res) => {
  res.send('List of users');
};

// دریافت اطلاعات یک کاربر خاص
const getUserById = (req, res) => {
  res.send(`User ID: ${req.params.id}`);
};

// ایجاد کاربر جدید
const createUser = (req, res) => {
  res.send('User created');
};

module.exports = { getAllUsers, getUserById, createUser };
