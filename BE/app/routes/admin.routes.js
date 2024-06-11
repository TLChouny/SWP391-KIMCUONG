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
  
    app.get('/api/getAllUsers',adminController.getAllUsers);

    app.post('/api/createUser',  adminController.createUser);

    app.get('/api/getUserById',  adminController.getUserById);

    app.put('/api/updateUser',  adminController.updateUser);

    app.delete('/api/deleteUser',  adminController.deleteUser);
  };
  