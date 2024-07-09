const db = require("../models");
const Order = db.order;
const Product = db.product;

// exports.create = (req, res) => {
//   const {
//     orderId,
//     userId,
//     orderProducts,
//     totalPrice,
//     orderStatus,
//     orderDate,
//     orderAddress,
//     paymentMethod,
//   } = req.body;

//   // Create and save the order
//   const order = new Order({
//     orderId,
//     userId,
//     orderProducts,
//     totalPrice,
//     orderStatus,
//     orderDate,
//     orderAddress,
//     paymentMethod,
//   });

//   order
//     .save()
//     .then(() => {
//       res.status(201).json({ message: "Order created successfully", order });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: err.message });
//     });
// };

exports.create = (req, res) => {
  const {
    orderId,
    userId,
    orderProducts,
    totalPrice,
    orderStatus,
    orderDate,
    orderAddress,
    paymentMethod,
    shipmentId,
  } = req.body;

  const order = new Order({
    orderId,
    userId,
    orderProducts,
    totalPrice,
    orderStatus,
    orderDate,
    orderAddress,
    paymentMethod,
    shipmentId,
  });

  order
    .save()
    .then(() => {
      res.status(201).json({ message: "Order created successfully", order });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  // Retrieve all orders from the database
  Order.find({})
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findById = (req, res) => {
  // Find a single order by orderId
  Order.findOne({ orderId: req.params.id })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.update = (req, res) => {
  // Update an order by orderId
  Order.findOneAndUpdate(
    { orderId: req.params.id },
    {
      userId: req.body.userId,
      orderProducts: req.body.orderProducts,
      totalPrice: req.body.totalPrice,
      orderStatus: req.body.orderStatus,
      orderDate: req.body.orderDate,
      orderAddress: req.body.orderAddress,
      paymentMethod: req.body.paymentMethod,
    },
    { new: true }
  )
    .then((updatedOrder) => {
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(updatedOrder);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
  // Delete an order by orderId
  Order.findOneAndRemove({ orderId: req.params.id })
    .then((order) => {
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findByUserId = (req, res) => {
  const userId = req.params.userId;

  Order.find({ userId })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.updateByUserId = (req, res) => {
  const userId = req.params.userId;
  const orderId = req.params.orderId;

  Order.findOneAndUpdate(
    { orderId, userId },
    {
      orderProducts: req.body.orderProducts,
      totalPrice: req.body.totalPrice,
      orderStatus: req.body.orderStatus,
      orderDate: req.body.orderDate,
      orderAddress: req.body.orderAddress,
      paymentMethod: req.body.paymentMethod,
    },
    { new: true }
  )
    .then((updatedOrder) => {
      if (!updatedOrder) {
        return res
          .status(404)
          .json({ message: "Order not found for this user" });
      }
      res.status(200).json(updatedOrder);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.deleteByUserId = (req, res) => {
  const userId = req.params.userId;
  const orderId = req.params.orderId;

  Order.findOneAndRemove({ orderId, userId })
    .then((order) => {
      if (!order) {
        return res
          .status(404)
          .json({ message: "Order not found for this user" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
