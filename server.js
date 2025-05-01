const express = require("express");
const app = express();
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");

app.use(cors());

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/main.js", (req, res) => {
  res.sendFile(path.join(__dirname, "main.js"));
});

app.get("/api/:username", async (request, response) => {
  const { username } = request.params;
  try {
    const apiResponse = await fetch(
      `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${username}`
    );
    const data = await apiResponse.text(); // Get the response as text
    response.send(data); // Send it to the frontend
  } catch (err) {
    response.status(500).send("Error fetching OSRS data");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
