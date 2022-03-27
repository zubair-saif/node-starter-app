const express = require("express");
const path = require("path");
const config = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const colors = require("colors");
const app = express();
const morgan = require("morgan");
const halmet = require("helmet");

// custom module import
const connectDB = require("./config/db");
const error = require("./middleware/error.middleware");

app.use(compression());
app.use(express.json());
app.use(
  halmet({
    contentSecurityPolicy: false,
    frameguard: true,
  })
);

//Load envirnoment variable
config.config({ path: "./.env" });

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// enable cors
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Ping app for testing connection
app.get("/ping", (req, res) => res.status(200).send("Hello world!"));

// Mount routers
require("./app/media/routesDefinations/media.routesDefs")(app);
require("./app/programs/routesDefinations/programs.routeDefs")(app);
require("./app/extras/routesDefinations/extras.routeDefs")(app);
require("./app/product/routesDefinations/product.routeDefs")(app);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Connect to database
connectDB();

app.use(error);

const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${port}`
      .yellow
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
