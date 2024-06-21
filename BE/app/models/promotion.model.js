const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
  promotionId: {
    type: Number,
    required: true,
    unique: true,
  },
  ProductId: {
    type: String,
    required: true,
    ref: "Product",
  },
  promotionValue: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Promotion = mongoose.model("Promotion", PromotionSchema);

module.exports = Promotion;
