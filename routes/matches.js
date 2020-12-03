const express = require("express");
const { matchState } = require("../matchState");
const { Match, validate } = require("../models/matches");
const router = express.Router();

router.get("/", async (req, res) => {
  const matches = await Match.find().sort({ date: 1, homeTeam: 1 });
  matches.map(async (match) => {
    match.isActive = matchState(match.date);
    await match.save();
  });

  res.send(matches);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let isActive = matchState(req.body.date);
 

  const match = new Match({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    duration: req.body.duration,
    homeTeamScore: req.body.homeTeamScore || 0,
    awayTeamScore: req.body.awayTeamScore || 0,
    isActive,
    date: req.body.date,
    league: req.body.league,
  });

 if (isActive == "will start") {
    match.homeTeamScore = 0;
    match.awayTeamScore = 0;
  }

  await match.save();

  res.send(match);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const match = await Match.findByIdAndUpdate(
    req.params.id,
    {
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      duration: req.body.duration,
      homeTeamScore: req.body.homeTeamScore || 0,
      awayTeamScore: req.body.awayTeamScore || 0,
      date: req.body.date,
      league: req.body.league,
    },
    { new: true }
  );

  if (!match)
    return res.status(404).send("there is no match with the given ID");

  res.send(match);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const match = await Match.findById(id);
  if (!match)
    return res.status(404).send("there is no match with the given ID");

  await match.remove();
  res.send(match);
});

router.get("/:id", async (req, res) => {
  const match = await Match.findById(req.params.id);

  if (!match)
    return res.status(404).send("there is no match with the given ID");
  match.isActive = matchState(match.date);
  const result = await match.save();
  res.send(result);
});

module.exports = router;
