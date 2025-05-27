const mongoose = require("mongoose");

const SignSchema = new mongoose.Schema({
  word: { type: String, required: true },
  definition: { type: String, required: true },
  imageUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
});

module.exports = mongoose.model("Sign", SignSchema);
