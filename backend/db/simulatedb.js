let users = [
  {
    id: 0,
    email: "admin@gmail.com",
    role: "admin",
    wallet: 0,
  },
  {
    id: 1,
    email: "user1@gmail.com",
    role: "user",
    wallet: 100,
  },
  {
    id: 2,
    email: "user2@gmail.com",
    role: "user",
    wallet: 50,
  }
];

function getUser(email){
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i]
    }
  }
  return null;
}

function getIndexUser(email){
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return i;
    }
  }
  return -1;
}

function updateWallet(userEmail, ammount) {
  let i = getIndexUser(userEmail);
  users[i].wallet += ammount
}

let matches = new Map();


module.exports = {
  updateWallet,
  getIndexUser,
  getUser,
  matches
};

