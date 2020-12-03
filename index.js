const mongoose = require("mongoose");
const express = require("express");
const matches = require("./routes/matches");
const cors = require("cors");

const app = express();
app.use(cors());

const url =
  "mongodb+srv://ahmedjdoa:1234@game.oq6ej.mongodb.net/game?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully ...."))
  .catch((error) => {
    console.log(error.message);
  });

app.use(express.json());
app.use("/api/matches", matches);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
