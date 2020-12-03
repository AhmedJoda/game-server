const mongoose = require("mongoose");
const Joi = require("joi");
const { date } = require("joi");

const matchSchema = new mongoose.Schema({
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: String },
    homeTeamScore: { type: Number , default: 0},
    awayTeamScore: { type: Number ,default: 0},
    isActive: { type: String , default: "will start"},
    league: { type: String, required: true },
    date: { type: String, required: true }

});

const Match = mongoose.model("Match", matchSchema);

function validateMatch(match) {
  const schema = Joi.object({
 homeTeam: Joi.string().required(),
awayTeam : Joi.string().required(),
startTime: Joi.string().required(),
endTime: Joi.string().required(),
duration: Joi.string(),
homeTeamScore: Joi.number(),
awayTeamScore: Joi.number(),
isActive: Joi.string(),
league: Joi.string().required(),
date: Joi.date().required()
  });

  return schema.validate(match);
}

exports.Match  = Match;
exports.validate = validateMatch;
