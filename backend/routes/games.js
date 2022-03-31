const express = require('express');
const router = express.Router();

let games = [
  {
    id: 0,
    name: "Counter Strike Global Defense II", 
    description: "Counter-Strike é uma série de jogos eletrônicos de tiro em primeira pessoa multiplayer, no qual times de terroristas e contra-terroristas batalham entre si, respectivamente, realizando um ato de terror e prevenindo-os. A série iniciou-se no Windows em 1999 com a primeira versão do Counter-Strike."
  },
  {
    id:  1,
    name: "Rocket League", 
    description:"Rocket League é um jogo eletrônico de futebol em veículos desenvolvido e publicado pela Psyonix. Foi lançado pela primeira vez para Microsoft Windows e PlayStation 4 em julho de 2015, com as portes para o Xbox One, MacOS, Linux e Nintendo Switch sendo lançados posteriormente."
  }
  ];

// retorna todasos jogos cadastrados
router.get('/', function(req, res, next) {
  res.json(games);
});

// cadastra um novo jogo
router.post('/', function(req, res, next) {
  games.push({"id": games.length, "name": req.body.name, "description": req.body.description})
  res.json(games[games.length-1]);
  res.status(201)
});

router.get('/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  res.json(games[id]);
  res.status(201)
});

module.exports = router;
