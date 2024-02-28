require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const port = 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));

require("./config/mongoose.config");
require("./routes/user.route")(app);
require("./routes/category.route")(app);
require("./routes/list.route")(app);
require("./routes/item.route")(app);
require("./routes/notification.route")(app);

const NotificationController = require("./controllers/notification.controller");
// Sends expiration date notifications every day at 7 AM PST.
// Adjust frequency/time based on timezones if necessary.
cron.schedule('0 7 * * *', NotificationController.pushNotificationsToArray);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`Listening on port: ${port}`));
