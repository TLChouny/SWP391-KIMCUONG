const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
dbConfig.connect();
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
//user routes
require("./app/routes/user.routes")(app);
//product routes
require("./app/routes/product.routes")(app);
//Include admin routes
require("./app/routes/admin.routes")(app);
require("./app/routes/promotion.routes")(app);
require("./app/routes/warranty.routes")(app);
require("./app/routes/order.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
