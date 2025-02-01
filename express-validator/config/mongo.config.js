const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/mongoose-tutorial"

mongoose.connect(DB_URL)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Connection failed!", err));
