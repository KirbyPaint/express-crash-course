const express = require("express");
const path = require("path");
// const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");

const app = express();

// Initialize middleware
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) => res.render("index"));

// Set static folder - since this comes after homepage,
// it no longer renders
// Usually there aren't both static folders and handlebars things
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
