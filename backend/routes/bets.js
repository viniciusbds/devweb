const express = require('express');
const router = express.Router();
const { updateWallet,
  matches
} = require('../db/simulatedb');

let bets = new Map();
// map matcheID ---> FUNDS


function finishBet(matcheID){
  let bet = bets.get(matcheID);
  let total = 0;
  for (var i = 0; i < bet.funds.length; i++) {
    let fund = bet.funds[i];
    total += fund.ammount;
  }
}


function getAllBets() {
  let result = []
  bets.forEach((funds,matcheID) => {
    for (let i = 0; i < funds.length; i++) {
      const fund = funds[i];
      result.push({
        "matcheID": matcheID, 
        "user": fund.user, 
        "ammount": fund.ammount,
        "teamWinner": fund.teamWinner
      })
    }
    })
  return result
}

function getAllBetsFilterByUserEmail(userEmail) {
  let result = []
  bets.forEach((funds,matcheID) => {
    for (let i = 0; i < funds.length; i++) {
      const fund = funds[i];
      if (fund && fund.user == userEmail) {
        result.push({
          "matcheID": matcheID, 
          "user": fund.user, 
          "ammount": fund.ammount,
          "teamWinner": fund.teamWinner
        })
      }
    }
    })
  return result
}

router.get('/', function(req, res, next) {
  let result;

  // filtrar apostas de um usuario
  if (req.query.userEmail){
    result = getAllBetsFilterByUserEmail(req.query.userEmail)
  } else {
    result = getAllBets()
  }
  res.json(result);
});



router.post('/bet', function(req, res, next) {
  let userEmail = req.body.userEmail;
  let matcheID = req.body.matcheID;
  let ammount = req.body.ammount;
  let teamWinner = req.body.teamWinner

  if (bets.has(matcheID)){
      bets.get(matcheID).push({
        user: userEmail,
        ammount: ammount,
        teamWinner: teamWinner
      })
  } else {
      bets.set(matcheID,[
        {
          user: userEmail,
          ammount: ammount,
          teamWinner: teamWinner
        }
      ])
  }

  updateWallet(userEmail, -1 * ammount)
  res.json(bets);
  res.status(200)
});

router.post('/finish/:matcheID', function(req, res, next) {
  let matcheID = parseInt(req.params.matcheID);
  let teamWinner = req.body.teamWinner;

  let funds = bets.get(matcheID);

  let total = 0
  let sumWinners = 0

  if (funds) {
    for (var i = 0; i < funds.length; i++) {
      let fund = funds[i]  
      total += parseInt(fund.ammount)
      if (fund.teamWinner === teamWinner){
        sumWinners += parseInt(fund.ammount)
      }
    }

    for (var i = 0; i < funds.length; i++) {
      let fund = funds[i]

      if (fund && fund.teamWinner === teamWinner){
        let peso = 0
        if (sumWinners > 0) {
          peso = fund.ammount / sumWinners
        }
        updateWallet(fund.user, peso * total)
      }
    }
 
  
  }

  matches.delete(matcheID)
  bets.delete(matcheID)
  res.json("ok");
  res.status(200)
});

module.exports = router;
