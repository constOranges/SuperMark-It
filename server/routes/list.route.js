const ListController = require("../controllers/list.controller");
const { authenticate, getIdFromCookie } = require("../config/jwt.config");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post(
    "/api/lists/add",
    authenticate,
    getIdFromCookie,
    ListController.addList
  );
  app.patch(
    "/api/lists/remove",
    authenticate,
    getIdFromCookie,
    ListController.removeList
  );
  app.patch(
    "/api/lists/edit",
    authenticate,
    getIdFromCookie,
    ListController.editList
  );
};
