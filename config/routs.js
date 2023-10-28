module.exports = (app) => {
  app.post("/signup", app.api.user.save);
  app.post("/login", app.api.auth.login);
  app.get("/getUsers", app.api.user.getUser);
};
