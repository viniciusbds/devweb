const express = require('express');
const router = express.Router();

let teams = [
  {
    id: 0,
    game: 0,
    name: "NAVI", 
    country: "Ucrania"
  },
  {
    id: 1,
    game: 0,
    name: "g2", 
    country: "Alemanha"
  },
  {
    id: 2,
    game: 0,
    name: "Team Liquid", 
    country: "EUA"
  },
  {
    id: 3,
    game: 0,
    name: "FURIA", 
    country: "Brasil"
  },
  {
    id: 4,
    game: 1,
    name: "Dignitas", 
    country: "EUA"
  },
  {
    id: 5,
    game: 1,
    name: "Ghost Gaming", 
    country: "EUA"
  },
  ];

// retorna todasos jogos cadastrados
router.get('/', function(req, res, next) {
  if (req.query.game){

    let filtArray = teams.filter((t)=>{
      if (t.game === parseInt(req.query.game)) {
        return t;
      }
    });
    res.json(filtArray);

  } else {
    res.json(teams);
  }

   
});

// cadastra um novo jogo
router.post('/', function(req, res, next) {
  teams.push({"id": teams.length, "name": req.body.name, "game": parseInt(req.body.game), "country": req.body.country})
  res.json(teams[teams.length-1]);
  res.status(201)
});

module.exports = router;
