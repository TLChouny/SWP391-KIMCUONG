const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  ProductId: {
    type: Number,
    required: true,
    unique: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  ProductDescription: {
    type: String,
    required: true,
  },
  ProductPrice: {
    type: Number,
    required: true,
  },
  ProductStockQuantity: {
    type: Number,
    required: true,
  },
  ProductImageURL: {
    type: String,
    required: true,
  },
  ProductCategory: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
