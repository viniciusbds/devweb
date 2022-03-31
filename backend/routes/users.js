const express = require('express');
const router = express.Router();

const { updateWallet,
  getUser
} = require('../db/simulatedb');



router.put('/wallet/:userEmail', async function(req, res, next) {
  let userEmail = req.params.userEmail;
  const {ammount} = req.body;
  let user = getUser(userEmail);

  if (user !== null) {
      updateWallet(userEmail, ammount)
      res.status(200)
      res.send("ok")
  } else {
    res.status(404)
    res.send("Usuario encontrado")
  }
});

router.get('/wallet/:userEmail', async function(req, res, next) {
  let userEmail = req.params.userEmail;
  let user = getUser(userEmail);
  if (user !== null) {
      // res.status(user.wallet)
      res.status(200)
      res.send({
        "wallet": user.wallet
      })
  } else {
    res.status(404)
    res.send("Usuario encontrado")
  }
});

router.post('/auth', async function(req, res, next) {
  const {email, password} = req.body;

  let user = getUser(email);

  if (user !== null) {
    res.status(200)
    res.send({
      token:"token",
      role: user.role
    })
  } else {
    res.status(403)
    res.send("Não autorizado")
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
