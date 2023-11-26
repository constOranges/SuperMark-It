const CategoryController = require('../controllers/category.controller');
const { authenticate, getIdFromCookie } = require('../config/jwt.config');

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/api/category/add', authenticate, getIdFromCookie, CategoryController.addCategory);
    app.patch('/api/category/remove/:id', authenticate, getIdFromCookie, CategoryController.removeCategory);
}