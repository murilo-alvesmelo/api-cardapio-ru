module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/login", app.api.auth.login);
  app.get("/getUsers", app.api.user.getUser);

  app
    .route("/cardapio")
    .all(app.config.passport.authenticate())
    .get(app.api.cardapio.getCardapio)
    .post(app.api.cardapio.saveCardapio);

  app
    .route("/cardapio/:id")
    .all(app.config.passport.authenticate())
    .get(app.api.cardapio.getOneCardapio)
    .delete(app.api.cardapio.removeCardapio)
    .put(app.api.cardapio.updateCardapio);
};
