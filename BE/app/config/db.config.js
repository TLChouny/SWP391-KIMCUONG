const db = require("../../app/models");
const Role = db.role;

module.exports.system = {
  HOST: "0.0.0.0",
  PORT: 27017,
  DB: "bezkoder_db",
};

module.exports.connect = () => {
  db.mongoose
    .connect(`mongodb://0.0.0.0:27017/bezkoder_db`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      initial();
    })
    .catch((err) => {
      console.error("Connection error", err);
      process.exit();
    });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });

        new Role({
          name: "manager",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'moderator' to roles collection");
        });

        new Role({
          name: "admin",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });

        new Role({
          name: "delivery",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });

        new Role({
          name: "sale",
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
};
