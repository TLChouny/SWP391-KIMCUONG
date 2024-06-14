const { authJwt } = require("../middlewares");
const productController = require("../controllers/product.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/products/create",
    [authJwt.verifyToken, authJwt.isManager],
    productController.create
  );

  app.get("/api/products", productController.findAll);

  app.get("/api/products/:id", productController.findById);

  app.get("/api/products/category/:category", productController.findByCategory);

  app.put(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isManager],
    productController.update
  );

  app.delete(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isManager],
    productController.delete
  );
};
