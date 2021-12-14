var express = require('express');
var router = express.Router();

let matches = [];

// retorna todas as partidas cadastradas
router.get('/', function(req, res, next) {
  res.json(matches);
});

// cadastra uma nova partida
router.post('/', function(req, res, next) {
  matches.push({"id": matches.length, "game": req.body.game, "team1": req.body.team1,"team2":  req.body.team2, "date": req.body.date})
  res.json(matches[matches.length-1]);
  res.status(201)
});

module.exports = router;
