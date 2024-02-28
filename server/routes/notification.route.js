const NotificationController = require("../controllers/notification.controller");
const { authenticate, getIdFromCookie } = require("../config/jwt.config");

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });
    app.patch(
        "/api/notifications/delete",
        authenticate,
        getIdFromCookie,
        NotificationController.deleteNotificationById
    )
    app.patch(
        "/api/notifications/clearall",
        authenticate,
        getIdFromCookie,
        NotificationController.clearAllNotifications
    );
}