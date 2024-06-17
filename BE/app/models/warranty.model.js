const mongoose = require("mongoose");

const WarrantySchema = new mongoose.Schema({
  warrantyId: {
    type: Number,
    required: true,
    unique: true,
  },
  productId: {
    type: Number,
    required: true,
    ref: "Product",
  },
  warrantyPeriod: {
    type: Number,
    required: true,
    min: 0,
  },
  warrantyDescription: {
    type: String,
    required: true,
  },
});

const Warranty = mongoose.model("Warranty", WarrantySchema);

module.exports = Warranty;
