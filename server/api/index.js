const express = require("express");
const app = express();
const app = require("../server"); // if server.js is one level up
const serverless = require("serverless-http");

module.exports = serverless(app);


// Middleware and routes
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Export handler for Vercel
module.exports = app;
