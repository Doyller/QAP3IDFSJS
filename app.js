const express = require("express");
const methodOverride = require("method-override");
const apiRoutes = require("./src/routes/api");
const viewRoutes = require("./src/routes/views");
const path = require("path");

const app = express();

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Routes
app.use("/api/menuItems", apiRoutes);
app.use("/menuItems", viewRoutes);

// Root route handler
app.get("/", (req, res) => {
  // You can choose to redirect or render a specific view for the root URL
  res.redirect("/menuItems");
});

// Error handler for routes that don't exist
app.use((req, res) => {
  res.status(404).send("Page not found");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
