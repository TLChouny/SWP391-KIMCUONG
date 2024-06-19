const { authJwt } = require("../middlewares");
const adminController = require("../controllers/admin.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
      "/api/admin/getDashboard",
      [authJwt.verifyToken, authJwt.isAdmin],
      adminController.getDashboard
    );
  
    app.get('/api/admin/getAllUsers',[authJwt.verifyToken, authJwt.isAdmin],adminController.getAllUsers);

    app.post('/api/admin/createUser',[authJwt.verifyToken, authJwt.isAdmin],  adminController.createUser);

    app.get('/api/admin/getUserById',[authJwt.verifyToken, authJwt.isAdmin],  adminController.getUserById);

    app.put('/api/admin/updateUser',[authJwt.verifyToken, authJwt.isAdmin],  adminController.updateUser);

    app.delete('/api/admin/deleteUser',[authJwt.verifyToken, authJwt.isAdmin],  adminController.deleteUser);
  };
  