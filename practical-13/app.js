const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { error: null });
});

app.post("/calculate", (req, res) => {
  let income1 = req.body.income1;
  let income2 = req.body.income2;

  // Validation
  if (!income1 || !income2 || isNaN(income1) || isNaN(income2)) {
    return res.render("index", { error: "⚠️ Please enter valid numbers for both incomes." });
  }

  income1 = parseFloat(income1);
  income2 = parseFloat(income2);
  const total = income1 + income2;

  res.render("result", { income1, income2, total });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
