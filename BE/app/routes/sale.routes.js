const { authJwt } = require("../middlewares");
const saleController = require("../controllers/sale.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/sales/create",
    [authJwt.verifyToken, authJwt.isManager],
    saleController.create
  );

  app.get("/api/sales", saleController.findAll);

  app.get("/api/sales/:id", saleController.findById);

  app.get("/api/sales/product/:id", saleController.findByProductId);

  app.put(
    "/api/sales/:id",
    [authJwt.verifyToken, authJwt.isManager],
    saleController.update
  );

  app.delete(
    "/api/sales/:id",
    [authJwt.verifyToken, authJwt.isManager],
    saleController.delete
  );
};
