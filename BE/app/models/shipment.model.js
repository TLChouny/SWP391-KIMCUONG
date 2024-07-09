const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  shipmentId: {
    type: String,
    required: true,
    unique: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Order",
  },
  shipmentDate: {
    type: Date,
    default: Date.now,
  },
  shipmentStatus: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "in_transit", "delivered", "cancelled"],
    default: "pending",
  },
});

const Shipment = mongoose.model("Shipment", ShipmentSchema);

module.exports = Shipment;
