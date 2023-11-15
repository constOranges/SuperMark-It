require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));

require('./config/mongoose.config');
require("./routes/user.route")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );