const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => callback(hash));
    });
  };

  const save = (req, res) => {
    obterHash(req.body.password, (hash) => {
      const password = hash;

      app
        .db("users")
        .insert({
          name: req.body.name,
          cpf: req.body.cpf,
          email: req.body.email,
          password,
        })
        .then((_) => res.status(201).send())
        .catch((err) => res.status(400).json(err));
    });
  };

  const getUser = (req, res) => {
    app
      .db("users")
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(400).send(err));
  };
  return { save, getUser };
};
