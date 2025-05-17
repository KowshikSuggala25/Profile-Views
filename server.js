const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const VIEW_FILE = path.join(__dirname, "views.json");

app.use(express.static("public"));

app.get("/api/views", (req, res) => {
  let data = { count: 0 };

  if (fs.existsSync(VIEW_FILE)) {
    data = JSON.parse(fs.readFileSync(VIEW_FILE, "utf8"));
  }

  data.count += 1;
  fs.writeFileSync(VIEW_FILE, JSON.stringify(data));

  res.json({ count: data.count });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
