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
    app.post('/api/items/newItemToCategory', authenticate, getIdFromCookie, ItemController.addItemToCategory);
    app.post('/api/items/newItemToList', authenticate, getIdFromCookie, ItemController.addItemToList);
    app.patch('/api/items/existingItemToCategory', authenticate, getIdFromCookie, ItemController.existingItemToCategory);
    app.patch('/api/items/existingItemToList', authenticate, getIdFromCookie, ItemController.existingItemToList);
    app.patch('/api/items/removeItemFromCategory', authenticate, getIdFromCookie, ItemController.removeItemFromCategory);
    app.patch('/api/items/removeItemFromList', authenticate, getIdFromCookie, ItemController.removeItemFromList);
}