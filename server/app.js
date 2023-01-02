const express = require("express");
const cors = require("cors");
require("./db/mongoose.js");
const { indexRoute } = require("./routes/index.routes.js");

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());

app.use("/api", indexRoute);

const PORT = 5000;
/**/
const db = require("./models");
const Role = db.role;

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

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
        name: "moderator",
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
    }
  });
}

module.exports = {
  initial,
};

/**/

app.listen(PORT, () => {
  console.log("Listening to PORT " + PORT);
});
