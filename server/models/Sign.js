const mongoose = require("mongoose");

const SignSchema = new mongoose.Schema(
  {
    word: { type: String, required: true, trim: true },
    definition: { type: String, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    category: { type: String, enum: ['noun', 'verb', 'adjective', 'other'], default: 'other' },
    difficulty: { type: Number, min: 1, max: 5, default: 3 },
    tags: [{ type: String }],
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Sign", SignSchema);

