const db = require("../models");
const Warranty = db.warranty;

exports.create = (req, res) => {
  // Create a new warranty
  const warranty = new Warranty({
    warrantyId: req.body.warrantyId,
    productId: req.body.productId,
    warrantyPeriod: req.body.warrantyPeriod,
    warrantyDescription: req.body.warrantyDescription,
  });

  // Save the warranty to the database
  warranty.save((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    res.status(201).json({ message: "Warranty created successfully" });
  });
};

exports.findAll = (req, res) => {
  // Retrieve all warranties from the database
  Warranty.find({})
    .then((warranties) => {
      res.status(200).json(warranties);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findById = (req, res) => {
  // Find a single warranty by warrantyId
  Warranty.findOne({ warrantyId: req.params.id })
    .then((warranty) => {
      if (!warranty) {
        return res.status(404).json({ message: "Warranty not found" });
      }
      res.status(200).json(warranty);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findByProductId = (req, res) => {
  // Find warranties by productId
  Warranty.find({ productId: req.params.id })
    .then((warranties) => {
      if (!warranties || warranties.length === 0) {
        return res
          .status(404)
          .json({ message: "No warranties found for the given productId" });
      }

      res.status(200).json(warranties);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the warranties" });
    });
};

exports.update = (req, res) => {
  // Update a warranty by warrantyId
  Warranty.findOneAndUpdate(
    { warrantyId: req.params.id },
    {
      productId: req.body.productId,
      warrantyPeriod: req.body.warrantyPeriod,
      warrantyDescription: req.body.warrantyDescription,
    },
    { new: true }
  )
    .then((updatedWarranty) => {
      if (!updatedWarranty) {
        return res.status(404).json({ message: "Warranty not found" });
      }
      res.status(200).json(updatedWarranty);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  // Delete a warranty by warrantyId
  Warranty.findOneAndRemove({ warrantyId: req.params.id })
    .then((warranty) => {
      if (!warranty) {
        return res.status(404).json({ message: "Warranty not found" });
      }
      res.status(200).json({ message: "Warranty deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
