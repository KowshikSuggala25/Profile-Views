const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express(); // 🔥 Create Express app instance

const PORT = process.env.PORT || 3000;
const VIEW_FILE = path.join(__dirname, "views.json");

// Routes come after this
