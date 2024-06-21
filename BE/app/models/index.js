const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.product = require("./product.model");
db.admin = require("./admin.model");
db.promotion = require("./promotion.model");
db.warranty = require("./warranty.model");


db.ROLES = ["user", "admin", "manager", "delivery", "sale"];

module.exports = db;
