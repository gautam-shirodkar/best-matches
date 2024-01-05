// const fs = require("node:fs/promises");
// const bodyParser = require("body-parser");
// const express = require("express");
import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import { match } from "node:assert";
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

const datafilePath = "./data/matches.json";
const imagesfilePath = "./data/images.json";

app.get("/matches/images", async (req, res) => {
  const imagesFileContent = await fs.readFile(imagesfilePath);
  const images = JSON.parse(imagesFileContent);
  res.json({ images });
});

app.get("/matches", async (req, res) => {
  const { max, search } = req.query;
  let matches = [];
  try {
    await fs.access(datafilePath, fs.constants.F_OK);
    const matchesContent = await fs.readFile(datafilePath);
    matches = JSON.parse(matchesContent);
  } catch (err) {
    return res.status(200).json([]);
  }

  if (search) {
    matches = matches.filter((match) => {
      const searchableText = `${match.title} ${match.description} ${match.location}`;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    });
  }

  if (max) {
    matches = matches.slice(matches.length - max, matches.length);
  }

  res.json({
    matches: matches.map((match) => ({
      id: match.id,
      title: match.title,
      image: match.image,
      date: match.date,
      location: match.location,
    })),
  });
});

app.post("/matches", async (req, res) => {
  const { match } = req.body;

  if (!match) {
    return res.status(400).json({ message: "Sports match is required" });
  }

  // console.log(match);

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
  let matches = [];

  try {
    await fs.access(datafilePath, fs.constants.F_OK);
    console.log(`File "${datafilePath}" already exists.`);
    const matchesContent = await fs.readFile(datafilePath);
    matches = JSON.parse(matchesContent);
  } catch (err) {
    // File doesn't exist, create a new file
    await fs.writeFile(datafilePath, JSON.stringify(matches));
    console.log(`File "${datafilePath}" created successfully.`);
  }

  const newMatch = {
    id: Math.round(Math.random() * 10000).toString(),
    ...match,
  };

  console.log(matches);

  matches.push(newMatch);

  await fs.writeFile(datafilePath, JSON.stringify(matches));

  res.json({ match: newMatch });
});

app.get("/matches/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await fs.access(datafilePath, fs.constants.F_OK);
    console.log(`File "${datafilePath}" already exists.`);
    const matchesContent = await fs.readFile(datafilePath);
    const matches = JSON.parse(matchesContent);
    const match = matches.find((match) => match.id === id);

    if (!match) {
      return res.status(404).json({ message: `No match could be found.` });
    }
    res.json({ match });
  } catch (err) {
    return res.status(404).json({ message: `No match could be found.` });
  }
});

app.put("/matches/:id", async (req, res) => {
  const { id } = req.params;
  const { match } = req.body;

  if (!match) {
    return res.status(400).json({ message: "Sports match is required" });
  }

  // console.log(match);

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

  try {
    await fs.access(datafilePath, fs.constants.F_OK);
    const matchesContent = await fs.readFile(datafilePath);
    const matches = JSON.parse(matchesContent);
    const matchIndex = matches.findIndex((match) => match.id === id);

    if (matchIndex === -1) {
      return res.status(404).json({ message: "Match not found" });
    }
    matches[matchIndex] = {
      id,
      ...match,
    };
    await fs.writeFile(datafilePath, JSON.stringify(matches));
    res.json({ match: matches[matchIndex] });
  } catch (err) {
    return res.status(404).json({ message: "Match not found" });
  }
});

app.delete("/matches/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await fs.access(datafilePath, fs.constants.F_OK);
    const matchesContent = await fs.readFile(datafilePath);
    const matches = JSON.parse(matchesContent);
    const matchIndex = matches.findIndex((match) => match.id === id);
    if (matchIndex === -1) {
      return res.status(404).json({ message: "Match not found" });
    }

    matches.splice(matchIndex, 1);

    await fs.writeFile(datafilePath, JSON.stringify(matches));

    res.json({ message: "Match deleted" });
  } catch (err) {
    return res.status(404).json({ message: "There was some error" });
  }
});

app.listen(4000, () => console.log("server running on port 4000"));
