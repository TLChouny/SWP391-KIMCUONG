const { authJwt } = require("../middlewares");
const warrantyController = require("../controllers/warranty.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/warranties/create",
    [authJwt.verifyToken, authJwt.isManager],
    warrantyController.create
  );

  app.get("/api/warranties", warrantyController.findAll);

  app.get("/api/warranties/:id", warrantyController.findById);

  app.get("/api/warranties/product/:id", warrantyController.findByProductId);

  app.put(
    "/api/warranties/:id",
    [authJwt.verifyToken, authJwt.isManager],
    warrantyController.update
  );

  app.delete(
    "/api/warranties/:id",
    [authJwt.verifyToken, authJwt.isManager],
    warrantyController.delete
  );
};
