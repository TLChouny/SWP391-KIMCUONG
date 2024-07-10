const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
  promotionId: {
    type: String,
    required: true,
    unique: true,
  },
  promotionValue: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Promotion = mongoose.model("Promotion", PromotionSchema);

module.exports = Promotion;
