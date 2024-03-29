const ItemController = require("../controllers/item.controller");
const { authenticate, getIdFromCookie } = require("../config/jwt.config");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post(
    "/api/items/newItemToCategory",
    authenticate,
    getIdFromCookie,
    ItemController.addItemToCategory
  );
  app.post(
    "/api/items/newItemToList",
    authenticate,
    getIdFromCookie,
    ItemController.addItemToList
  );
  app.patch(
    "/api/items/existingItemToCategories",
    authenticate,
    getIdFromCookie,
    ItemController.existingItemToCategories
  );
  app.patch(
    "/api/items/existingItemToLists",
    authenticate,
    getIdFromCookie,
    ItemController.existingItemToLists
  );
  app.patch(
    "/api/items/removeItemFromCategory",
    authenticate,
    getIdFromCookie,
    ItemController.removeItemFromCategory
  );
  app.patch(
    "/api/items/removeItemFromList",
    authenticate,
    getIdFromCookie,
    ItemController.removeItemFromList
  );
  app.patch(
    "/api/items/updateItemInCategory",
    authenticate,
    getIdFromCookie,
    ItemController.updateItemInCategory
  );
  app.patch(
    "/api/items/updateItemInList",
    authenticate,
    getIdFromCookie,
    ItemController.updateItemInList
  );
  app.patch(
    "/api/items/renewItem",
    authenticate,
    getIdFromCookie,
    ItemController.renewItem
  );
};
