const { authJwt } = require("../middlewares");
const orderController = require("../controllers/order.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/orders/create", [authJwt.verifyToken], orderController.create);

  // Manager
  app.get(
    "/api/orders",
    [authJwt.verifyToken, authJwt.isManager],
    orderController.findAll
  );

  app.get(
    "/api/orders/:id",
    [authJwt.verifyToken, authJwt.isManager],
    orderController.findById
  );

  app.put(
    "/api/orders/:id",
    [authJwt.verifyToken, authJwt.isManager],
    orderController.update
  );

  app.delete(
    "/api/orders/:id",
    [authJwt.verifyToken, authJwt.isManager],
    orderController.delete
  );

  // User
  app.get(
    "/api/orders/user/:userId",
    [authJwt.verifyToken],
    orderController.findByUserId
  );

  app.put(
    "/api/orders/user/:userId/:orderId",
    [authJwt.verifyToken],
    orderController.updateByUserId
  );

  app.delete(
    "/api/orders/user/:userId/:orderId",
    [authJwt.verifyToken],
    orderController.deleteByUserId
  );
};
