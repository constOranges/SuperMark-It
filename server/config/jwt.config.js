const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}
module.exports.getIdFromCookie = (req, res, next) => {
    const decoded = jwt.verify(req.cookies.usertoken, secret);
    req.userId = decoded.id;
    next();
}