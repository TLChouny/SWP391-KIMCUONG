const db = require("../models");
const Promotion = db.promotion;

exports.create = (req, res) => {
  // Create a new promotion
  const promotion = new Promotion({
    promotionId: req.body.promotionId,
    ProductId: req.body.ProductId,
    promotionValue: req.body.promotionValue,
  });

  // Save the promotion to the database
  promotion.save((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    res.status(201).json({ message: "Promotion created successfully" });
  });
};

exports.findAll = (req, res) => {
  // Retrieve all promotions from the database
  Promotion.find({})
    .then((promotions) => {
      res.status(200).json(promotions);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findById = (req, res) => {
  // Find a single promotion by promotionId
  Promotion.findOne({ promotionId: req.params.id })
    .then((promotion) => {
      if (!promotion) {
        return res.status(404).json({ message: "Promotion not found" });
      }
      res.status(200).json(promotion);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findByProductId = (req, res) => {
  // Find promotions by productId
  Promotion.find({ ProductId: req.params.id })
    .then((promotions) => {
      if (!promotions.length) {
        return res
          .status(404)
          .json({ message: "No promotions found for the given ProductId" });
      }
      res.status(200).json(promotions);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the promotions" });
    });
};

exports.update = (req, res) => {
  // Update a promotion by promotionId
  Promotion.findOneAndUpdate(
    { promotionId: req.params.id },
    {
      ProductId: req.body.ProductId,
      promotionValue: req.body.promotionValue,
    },
    { new: true }
  )
    .then((updatedPromotion) => {
      if (!updatedPromotion) {
        return res.status(404).json({ message: "Promotion not found" });
      }
      res.status(200).json(updatedPromotion);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  // Delete a promotion by promotionId
  Promotion.findOneAndRemove({ promotionId: req.params.id })
    .then((promotion) => {
      if (!promotion) {
        return res.status(404).json({ message: "Promotion not found" });
      }
      res.status(200).json({ message: "Promotion deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
