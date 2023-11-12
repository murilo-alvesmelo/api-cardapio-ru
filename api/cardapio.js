const moment = require("moment");

module.exports = (app) => {
  const getCardapio = (req, res) => {
    const date = req.query.date
      ? req.query.date
      : moment().endOf("year").toDate();

    app
      .db("cardapio")
      .where("estimateAt", "<=", date)
      .orderBy("estimateAt")
      .then((cardapio) => res.status(200).json(cardapio))
      .catch((err) => res.status(400).send(err));
  };

  const getOneCardapio = (req, res) => {
    app
      .db("cardapio")
      .where({ id: req.params.id })
      .first()
      .then((cardapio) => res.status(200).json(cardapio))
      .catch((err) => res.status(400).json(err));
  };

  const saveCardapio = (req, res) => {
    if (!req.body.refeicao.trim()) {
      return res.status(400).send("Refeicao é um campo obrigatório");
    }

    req.body.userId = req.user.id;

    app
      .db("cardapio")
      .insert(req.body)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  };

  const removeCardapio = (req, res) => {
    app
      .db("cardapio")
      .where({ id: req.params.id })
      .del()
      .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.status(204).send();
        } else {
          const msg = `Não foi encontrado cardapio com id ${req.params.id}.`;
          res.status(400).send(msg);
        }
      })
      .catch((err) => res.status(400).json(err));
  };

  const updateCardapio = (req, res) => {
    app
      .db("cardapio")
      .where({ id: req.params.id })
      .update(req.body)
      .then((_) => res.status(204).send())
      .catch((err) => res.status(400).json(err));
  };

  return {
    getCardapio,
    saveCardapio,
    removeCardapio,
    updateCardapio,
    getOneCardapio,
  };
};
