const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  saleId: {
    type: Number,
    required: true,
    unique: true,
  },
  ProductId: {
    type: Number,
    required: true,
    ref: "Product",
  },
  saleValue: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
