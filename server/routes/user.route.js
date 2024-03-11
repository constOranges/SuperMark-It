const UserController = require('../controllers/user.controller');
const { authenticate, getIdFromCookie } = require('../config/jwt.config');

module.exports = app => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/api/users/register', UserController.createUser);
    app.post('/api/users/login', UserController.loginUser);
    app.post('/api/users/logout', UserController.logout);
    app.patch('/api/users/updateuser', authenticate, getIdFromCookie, UserController.updateUser);
    app.patch('/api/users/deleteuser', authenticate, getIdFromCookie, UserController.deleteUser);
    app.get('/api/users/currentuser', authenticate, getIdFromCookie, UserController.findOneUser);
}