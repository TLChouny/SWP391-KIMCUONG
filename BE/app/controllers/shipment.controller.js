const db = require("../models");
const Shipment = db.shipment;
const Order = db.order;

// exports.create = (req, res) => {
//   const { shipmentId, orderId, shipmentDate, shipmentStatus } = req.body;

//   const shipment = new Shipment({
//     shipmentId,
//     orderId,
//     shipmentDate,
//     shipmentStatus,
//   });

//   shipment
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Shipment created successfully", shipment });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err.message });
//     });
// };

exports.create = (req, res) => {
  const { shipmentId, orderId, shipmentDate, shipmentStatus } = req.body;

  const shipment = new Shipment({
    shipmentId,
    orderId,
    shipmentDate,
    shipmentStatus,
  });

  shipment
    .save()
    .then(() => {
      return Order.findByIdAndUpdate(orderId, { shipmentId: shipment._id });
    })
    .then(() => {
      res.status(201).json({ message: "Shipment created and order updated successfully", shipment });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};


exports.findAll = (req, res) => {
  Shipment.find({})
    .then((shipments) => {
      res.status(200).json(shipments);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findById = (req, res) => {
  Shipment.findOne({ shipmentId: req.params.id })
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.status(200).json(shipment);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.update = (req, res) => {
  Shipment.findOneAndUpdate(
    { shipmentId: req.params.id },
    {
      orderId: req.body.orderId,
      shipmentDate: req.body.shipmentDate,
      shipmentStatus: req.body.shipmentStatus,
    },
    { new: true }
  )
    .then((updatedShipment) => {
      if (!updatedShipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.status(200).json(updatedShipment);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  Shipment.findOneAndRemove({ shipmentId: req.params.id })
    .then((shipment) => {
      if (!shipment) {
        return res.status(404).json({ message: "Shipment not found" });
      }
      res.status(200).json({ message: "Shipment deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
