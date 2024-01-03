const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.post("/matches", async (req, res) => {
  const { match } = req.body;

  if (!match) {
    return res.status(400).json({ message: "Sports match is required" });
  }

  console.log(match);

  if (
    !match.title?.trim() ||
    !match.description?.trim() ||
    !match.date?.trim() ||
    !match.time?.trim() ||
    !match.image?.trim() ||
    !match.location?.trim()
  ) {
    return res.status(400).json({ message: "Invalid data provided." });
  }

  const matchesFileContent = await fs.readFile("./data/matches.json");
  const matches = JSON.parse(matchesFileContent);

  const newMatch = {
    id: Math.round(Math.random() * 10000).toString(),
    ...match,
  };

  matches.push(newMatch);

  await fs.writeFile("./data/matches.json", JSON.stringify(matches));

  res.json({ event: newMatch });
});

app.listen(4000, () => console.log("server running on port 4000"));
