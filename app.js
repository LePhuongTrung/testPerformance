var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const database = require("./Database/connect");
const { isLoggedIn } = require("./middleware/authentication");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

var Router = require("./routes/Routers");
var waitRouter = require("./routes/WaitRouters");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var app = express();

/* Limiting the number of requests to 100 per 15 minutes. */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Le Phuong Trung",
      url: "https://www.facebook.com/Peoplenogiveup",
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(fileUpload());
app.use(logger("dev"));
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "300kb" })); // body-parser defaults to a body size limit of 100kb

/* Helmet is a collection of 12 smaller middleware functions that set HTTP response headers. */
app.use(helmet());
//only used when actual deployment
// app.use(limiter);
app.use(cors());
app.use("/room", isLoggedIn, Router);
app.use("/room/wait", waitRouter);
app.use("/room/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/learn", (req, res) => {
  return res.status(200).send(1);
});
//IIFE
(async () => {
  await database.connectDatabase();
})();
module.exports = app;
