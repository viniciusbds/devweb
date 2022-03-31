const express = require('express');
const router = express.Router();
const { matches,
} = require('../db/simulatedb');

// retorna todas as partidas cadastradas
router.get('/', function(req, res, next) {
  console.log(matches)

  let game = parseInt(req.query.game)
  let result;
  if (req.query.game){
    result = getMatchesFilterByGame(game)
  } else {
    result = getAllMatches()
  }
  res.json(result);
});

function getMatchesFilterByGame(game) {
  let result = []

  matches.forEach((value,key) => {
    if (value.game === game) {
      result.push({
        "id": key, 
        "game": value.game, 
        "team1": value.team1,
        "team2": value.team2, 
        "date": value.date, 
        "description": value.description
      }) 
    }})
  return result;
}


function getAllMatches() {
  let result = []

  matches.forEach((value,key) => {
    result.push({
      "id": key, 
      "game": value.game, 
      "team1": value.team1,
      "team2": value.team2, 
      "date": value.date, 
      "description": value.description
    })  })
  return result;
}

router.get('/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  let m = matches.get(id)
  res.json({
    "id": id, 
    "game": m.game, 
    "team1": m.team1,
    "team2": m.team2, 
    "date": m.date, 
    "description": m.description
  });
  res.status(200)
});

// cadastra uma nova partida
router.post('/', function(req, res, next) {
  matches.set(matches.size, {
    "game": req.body.game, 
    "team1": req.body.team1,
    "team2":  req.body.team2, 
    "date": req.body.date,
    "description": req.body.description})
  res.json(matches.get(matches.size));
  res.status(201)
});

router.put('/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  matches.set(id, {
    "game": req.body.game, 
    "team1": req.body.team1,
    "team2":  req.body.team2, 
    "date": req.body.date,
    "description": req.body.description 
  })

  res.json(matches.get(id));

  res.status(200)
});

module.exports = router;
