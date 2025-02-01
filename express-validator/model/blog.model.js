const mongoose = require("mongoose");


const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, minLength: 5, maxLength: 255 },
  show: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  bookmarks: { type: [String], default: [] },
}, { timestamps: true });  // add => {createdAt و updatedAt}

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = { BlogModel };