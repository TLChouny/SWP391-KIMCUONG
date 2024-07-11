const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/profile", [authJwt.verifyToken], userController.getUserInfo);  
  app.put("/api/user/profile", [authJwt.verifyToken], userController.updateUserProfile);  
  app.put("/api/user/changepassword", [authJwt.verifyToken], userController.changePassword);
};

//endpoint để người dùng có thể xem và chỉnh sửa thông tin
//truy cập /api/user/profile để xem thông tin 
//và sử dụng phương thức HTTP PUT tới cùng endpoint để cập nhật thông tin