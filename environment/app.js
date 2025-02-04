const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require("path");
dotenv.config();

const nodeEnv = process.env.NODE_ENV;

dotenv.config({ path: path.join(__dirname, `.env.${nodeEnv}`) });

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// راه‌اندازی سرور روی پورت مشخص
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
