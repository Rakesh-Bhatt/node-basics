const express = require("express");
const userRoutes = require("./routes/userRoutes")
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger")
const app = express();

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use logger middleware
app.use(logger);

// user middleware
app.use(errorHandler)

// Use user routes
app.use("/api", userRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to my first Node server 🚀");
});

app.get('/test', (req, res) => {
  res.send('Test working');
});

// Listen on PORT
const PORT = 3003;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, (err) => {
  if (err) console.error("Failed to start server:", err);
  else console.log(`Server running on port ${PORT}`);
});