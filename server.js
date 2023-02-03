require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const InitiateMongoServer = require("./config/db");
const fileUpload = require("express-fileupload");
const auth = require("./routes/auth");
const categories = require("./routes/categories");
const subCategories = require("./routes/subCategories");
const courses = require("./routes/courses");
const chapters = require("./routes/chapters");
const lessons = require("./routes/lessons");
const quizzes = require("./routes/quizzes");
const customers = require("./routes/customers");
const dashboard = require("./routes/dashboard");
const profile = require("./routes/profile");
const passwordReset = require("./routes/passwordReset");
const countries = require("./routes/countries.routes");
const videos = require("./routes/videos");
const videosWatchTime = require("./routes/videosWatchTime");

InitiateMongoServer();

const app = express();
app.use(
  fileUpload({
    limits: { fileSize: 1000 * 1024 * 1024 },
  })
);
app.use(express.json({ limit: "1000mb" }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/categories", categories);
app.use("/api/subCategories", subCategories);
app.use("/api/courses", courses);
app.use("/api/chapters", chapters);
app.use("/api/lessons", lessons);
app.use("/api/quizzes", quizzes);
app.use("/api/customers", customers);
app.use("/api/dashboard", dashboard);
app.use("/api/passwordReset", passwordReset);
app.use("/api/countries", countries);
app.use("/api/videos", videos);
app.use("/api/videosWatchTime", videosWatchTime);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
