const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const jwtSecret = 'secretkey'

module.exports = function(req, res, next) {
    let token;
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    } else if (req.headers['x-access-token']) {
        token = req.headers['x-access-token']
    } else if (req.headers['token']) {
        token = req.headers['token']
    } else if (req.query.token) {
        token = req.query.token;
    }

    if (token) {
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                return next(err);
            }
            console.log('decoded >>', decoded);
            // req.loggedInUser = decoded;
            // return next();
            userModel.findById(decoded.id)
                .exec(function(err, user) {
                    if (err) {
                        return next(err);
                    }
                    if (user) {
                        req.loggedInUser = user;
                        return next();
                    } else {
                        next({
                            msg: 'user removed from system'
                        })
                    }
                })
        })

    } else {
        next({
            msg: 'Token not provided',
            status: 401
        })
    }

}