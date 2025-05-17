const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express(); // 🔥 Create Express app instance

const PORT = process.env.PORT || 3000; // Render provides PORT via environment variable
const VIEW_FILE = path.join(__dirname, "views.json");

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Profile Views Server! Visit /badge.svg to see the view count badge.");
});

// Badge route
app.get("/badge.svg", (req, res) => {
  let data = { count: 0 };

  try {
    if (fs.existsSync(VIEW_FILE)) {
      data = JSON.parse(fs.readFileSync(VIEW_FILE, "utf8"));
    }

    // Ensure template literal is clean and properly formatted
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="20">
  <rect width="150" height="20" fill="#0e75b6"/>
  <text x="10" y="14" fill="white" font-size="12" font-family="Verdana">
    👀 ${data.count} views
  </text>
</svg>
    `.trim(); // Trim to remove any leading/trailing whitespace

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  } catch (error) {
    console.error("Error generating badge:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});