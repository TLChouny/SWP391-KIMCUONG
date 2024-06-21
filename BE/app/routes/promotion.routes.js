const { authJwt } = require("../middlewares");
const saleController = require("../controllers/promotion.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/manager/promotions/create",
    [authJwt.verifyToken, authJwt.isManager],
    saleController.create
  );

  app.get("/api/promotions", saleController.findAll);

  app.get("/api/promotions/:id", saleController.findById);

  app.get("/api/promotions/product/:id", saleController.findByProductId);

  app.put(
    "/api/manager/promotions/:id",
    [authJwt.verifyToken, authJwt.isManager],
    saleController.update
  );

  app.delete(
    "/api/manager/promotions/:id",
    [authJwt.verifyToken, authJwt.isManager],
    saleController.delete
  );
};
