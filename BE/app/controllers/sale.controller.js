const db = require("../models");
const Sale = db.sale;

exports.create = (req, res) => {
  // Create a new sale
  const sale = new Sale({
    saleId: req.body.saleId,
    ProductId: req.body.ProductId,
    saleValue: req.body.saleValue,
  });

  // Save the sale to the database
  sale.save((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    res.status(201).json({ message: "Sale created successfully" });
  });
};

exports.findAll = (req, res) => {
  // Retrieve all sales from the database
  Sale.find({})
    .then((sales) => {
      res.status(200).json(sales);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findById = (req, res) => {
  // Find a single sale by saleId
  Sale.findOne({ saleId: req.params.id })
    .then((sale) => {
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json(sale);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findByProductId = (req, res) => {
  // Find sales by productId
  Sale.findOne({ ProductId: req.params.id })
    .then((sale) => {
      if (!sale) {
        return res
          .status(404)
          .json({ message: "No product found for the given ProductId" });
      }

      // Return the full product object, including the _id
      res.status(200).json(sale);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the product" });
    });
};

exports.update = (req, res) => {
  // Update a sale by saleId
  Sale.findOneAndUpdate(
    { saleId: req.params.id },
    {
      ProductId: req.body.productId,
      saleValue: req.body.saleValue,
    },
    { new: true }
  )
    .then((updatedSale) => {
      if (!updatedSale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json(updatedSale);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  // Delete a sale by saleId
  Sale.findOneAndRemove({ saleId: req.params.id })
    .then((sale) => {
      if (!sale) {
        return res.status(404).json({ message: "Sale not found" });
      }
      res.status(200).json({ message: "Sale deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
