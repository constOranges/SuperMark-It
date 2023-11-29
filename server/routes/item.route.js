const ItemController = require('../controllers/item.controller');
const { authenticate, getIdFromCookie } = require('../config/jwt.config');

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/api/item/newItemToCategory', authenticate, getIdFromCookie, ItemController.addItemToCategory);
    app.post('/api/item/newItemToList', authenticate, getIdFromCookie, ItemController.addItemToList);
    app.patch('/api/item/existingItemToCategory', authenticate, getIdFromCookie, ItemController.existingItemToCategory);
    app.patch('/api/item/existingItemToList', authenticate, getIdFromCookie, ItemController.existingItemToList);
    app.patch('/api/item/removeItemFromCategory', authenticate, getIdFromCookie, ItemController.removeItemFromCategory);
    app.patch('/api/item/removeItemFromList', authenticate, getIdFromCookie, ItemController.removeItemFromList);
}