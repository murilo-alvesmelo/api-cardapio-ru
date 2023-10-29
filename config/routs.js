module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/login", app.api.auth.login);
  app.get("/getUsers", app.api.user.getUser);

  app
    .route("/cardapio")
    .get(app.api.cardapio.getCardapio)
    .all(app.config.passport.authenticate())
    .post(app.api.cardapio.saveCardapio);

  app
    .route("/cardapio/:id")
    .get(app.api.cardapio.getOneCardapio)
    .all(app.config.passport.authenticate())
    .delete(app.api.cardapio.removeCardapio)
    .put(app.api.cardapio.updateCardapio);
};
