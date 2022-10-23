const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
dotenv.config({ path: "config.env" });

app.get("/", (req, res) => {
  res.send("EL back hathaaa");
});

//log requests
app.use(morgan("tiny"));

//parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectDB();

//routes
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

app.get("/ghadas", (req, res) => {
  res.status(200).send("hello word bae");
});
