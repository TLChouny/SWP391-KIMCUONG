const { authJwt } = require("../middlewares");
const shipmentController = require("../controllers/shipment.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/shipments/create",
    [authJwt.verifyToken],
    shipmentController.create
  );

  // Manager
  app.get(
    "/api/shipments",
    [authJwt.verifyToken, authJwt.isDelivery],
    shipmentController.findAll
  );

  app.get(
    "/api/shipments/:id",
    [authJwt.verifyToken, authJwt.isDelivery],
    shipmentController.findById
  );

  app.put(
    "/api/shipments/:id",
    [authJwt.verifyToken, authJwt.isDelivery],
    shipmentController.update
  );

  app.delete(
    "/api/shipments/:id",
    [authJwt.verifyToken, authJwt.isDelivery],
    shipmentController.delete
  );
};
