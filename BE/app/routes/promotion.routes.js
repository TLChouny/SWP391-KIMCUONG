const { authJwt } = require("../middlewares");
const promotionController = require("../controllers/promotion.controller");

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
    promotionController.create
  );

  app.get("/api/promotions", promotionController.findAll);

  app.get("/api/promotions/:id", promotionController.findById);

  app.put(
    "/api/manager/promotions/:id",
    [authJwt.verifyToken, authJwt.isManager],
    promotionController.update
  );

  app.delete(
    "/api/manager/promotions/:id",
    [authJwt.verifyToken, authJwt.isManager],
    promotionController.delete
  );
};
