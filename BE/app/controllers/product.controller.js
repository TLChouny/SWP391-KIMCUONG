const db = require("../models");
const Product = db.product;

exports.create = (req, res) => {
  // Create a new product
  const product = new Product({
    ProductId: req.body.ProductId,
    ProductName: req.body.ProductName,
    ProductDescription: req.body.ProductDescription,
    ProductPrice: req.body.ProductPrice,
    ProductStockQuantity: req.body.ProductStockQuantity,
    ProductImageURL: req.body.ProductImageURL,
    ProductCategory: req.body.ProductCategory,
  });

  // Save the product to the database
  product.save((err) => {
    if (err) {
      res.status(500).json({ message: err.message });
      return;
    }

    res.status(201).json({ message: "Product created successfully" });
  });
};

exports.findAll = (req, res) => {
  // Retrieve all products from the database
  Product.find({})
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findById = (req, res) => {
  // Find a single product by ProductId
  Product.findOne({ ProductId: req.params.id })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findByCategory = (req, res) => {
  // Find products by ProductCategory
  Product.find({ ProductCategory: req.params.category })
    .then((products) => {
      if (products.length === 0) {
        return res
          .status(404)
          .json({ message: "No products found for the given category" });
      }
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.update = (req, res) => {
  // Update a product by ProductId
  Product.findOneAndUpdate(
    { ProductId: req.params.id },
    {
      ProductName: req.body.ProductName,
      ProductDescription: req.body.ProductDescription,
      ProductPrice: req.body.ProductPrice,
      ProductStockQuantity: req.body.ProductStockQuantity,
      ProductImageURL: req.body.ProductImageURL,
      ProductCategory: req.body.ProductCategory,
    },
    { new: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  // Delete a product by ProductId
  Product.findOneAndRemove({ ProductId: req.params.id })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Product deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
