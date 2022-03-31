const express = require('express');
const router = express.Router();


let users = [{
  email:"user@gmail.com",
  password:"user",
  role: "user"
}, {
  email:"admin@gmail.com",
  password:"admin",
  role: "admin"
}]

router.post('/', async function(req, res, next) {
    const {email, password} = req.body;
    if (email === "user1@gmail.com") {
      res.status(200)
      res.send({
        token:"token",
        role: "user",
        email: "user1@gmail.com"
      })
    } else if (email === "user2@gmail.com"){
      res.status(200)
      res.send({
        token:"token",
        role: "user",
        email: "user2@gmail.com"
      })
    } else if (email === "admin@gmail.com"){
      res.status(200)
      res.send({
        token:"token",
        role: "admin",
        email: "admin@gmail.com"
      })
    } else {
      res.status(403)
      res.send("Não autorizado")
    }
  

});

module.exports = router;
