app.get("/badge.svg", (req, res) => {
  let data = { count: 0 };

  if (fs.existsSync(VIEW_FILE)) {
    data = JSON.parse(fs.readFileSync(VIEW_FILE, "utf8"));
  }

  // Generate SVG dynamically
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="20">
      <rect width="150" height="20" fill="#0e75b6"/>
      <text x="10" y="14" fill="white" font-size="12" font-family="Verdana">
        👀 ${data.count} views
      </text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});
