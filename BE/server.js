const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
dbConfig.connect();
const corsOptions = {
  // origin: "http://localhost:8081",
  origin: "http://localhost:3000/", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
// require("./app/routes/user.routes")(app);
require("./app/routes/product.routes")(app);
//Include admin routes
require("./app/routes/admin.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});