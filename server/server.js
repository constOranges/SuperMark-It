require('dotenv').config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = 8000;
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors({ origin: process.env.CLIENT_URI, credentials:true }));

import "./config/mongoose.config";
require("./routes/yelp_api.route")(app);
require("./routes/user.route")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );