const matchState= (date) => {
  const matchDate = new Date(date);
  const today = new Date();
  const formattedMatchDate = new Date(
    matchDate.getFullYear(),
    matchDate.getMonth(),
    matchDate.getDate()
  );
  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (formattedMatchDate > todayDate) return "will start";
  else if (formattedMatchDate < todayDate) return "finished";
  else return "active";
}

module.exports.matchState = matchState;