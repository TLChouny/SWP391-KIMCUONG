const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  ProductId: {
    type: String,
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
  ProductQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  ProductImageURL: {
    type: String,
    required: true,
  },
  ProductCategory: {
    type: String,
    required: true,
  },
  ProductMain: {
    type: String,
    required: true,
  },
  ProductSub: {
    type: String,
    required: true,
  },
  ProductMounting: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
