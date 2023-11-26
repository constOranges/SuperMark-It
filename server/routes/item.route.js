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
    app.post('/api/item/newItem/:id', authenticate, getIdFromCookie, ItemController.addItemToCategory);
}