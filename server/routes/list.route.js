const ListController = require('../controllers/list.controller');
const { authenticate, getIdFromCookie } = require('../config/jwt.config');

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/api/list/add', authenticate, getIdFromCookie, ListController.addList);
    app.patch('/api/list/remove/:id', authenticate, getIdFromCookie, ListController.removeList);
}