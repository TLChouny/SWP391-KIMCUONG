const { authJwt } = require("../middlewares");
const adminController = require("../controllers/admin.controller");

module.exports = function (app) {
  // Middleware to set headers allowing CORS and handling tokens
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/admin/getAllUsers",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.getAllUsers
  );

  app.get(
    "/api/admin/users/:role",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.getUsersByRole
  );

  app.post(
    "/api/admin/createUser",
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.createUser
  );

  app.get(
    "/api/admin/getUserById/:id", // Updated to include id parameter
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.getUserById
  );

  app.put(
    "/api/admin/updateUser/:id", // Updated to include id parameter
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.updateUser
  );

  app.delete(
    "/api/admin/deleteUser/:id", // Updated to include id parameter
    [authJwt.verifyToken, authJwt.isAdmin],
    adminController.deleteUser
  );
};
