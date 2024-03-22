require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIO = require("socket.io");
const cron = require("node-cron");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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
// Sends expiration date notifications every day at midnight according to user's local timezone.
cron.schedule("0 * * * *", async () => {
    await NotificationController.pushNotificationsToArray();
    io.emit("new-notification", { message: "New expiration notifications received!" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

io.on("connection", (socket) => {
  console.log("Client connected.");

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(port, () => console.log(`Listening on port: ${port}`));
