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

/**/

app.listen(PORT, () => {
  console.log("Listening to PORT " + PORT);
});
