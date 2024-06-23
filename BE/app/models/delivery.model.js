const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

module.exports = mongoose.model('Delivery', DeliverySchema);