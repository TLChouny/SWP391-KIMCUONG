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
      "/api/getDashboard",
      [authJwt.verifyToken, authJwt.isAdmin],
      adminController.getDashboard
    );
  
    app.get('/api/getAllUsers', [authJwt.verifyToken, authJwt.isAdmin],adminController.getAllUsers);

    app.post('/api/createUser', [authJwt.verifyToken, authJwt.isAdmin], adminController.createUser);

    app.get('/api/getUserById', [authJwt.verifyToken, authJwt.isAdmin], adminController.getUserById);

    app.put('/api/updateUser', [authJwt.verifyToken, authJwt.isAdmin], adminController.updateUser);

    app.delete('/api/deleteUser', [authJwt.verifyToken, authJwt.isAdmin], adminController.deleteUser);
  };
  