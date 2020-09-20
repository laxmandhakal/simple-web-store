const bcrypt = require('bcrypt')
const router = require('express').Router()
const userModel = require('./../models/user.model')
const jwt = require('jsonwebtoken')
const jwtSecret = 'secretkey'

function user(mapData, reqBody) {
    if (reqBody.name) {
        mapData.name = reqBody.name
    }
    if (reqBody.email) {
        mapData.email = reqBody.email;
    }
    if (reqBody.username) {
        mapData.username = reqBody.username
    }
    if (reqBody.dob) {
        mapData.dob = reqBody.dob
    }
    if (reqBody.phoneNumber) {
        mapData.phoneNumber = reqBody.phoneNumber
    }
    if (reqBody.password) {
        hash = bcrypt.hashSync(reqBody.password, 2);
        mapData.password = hash

    }
    return mapData
}

router
    .post('/register', function(req, res, next) {
        console.log(req.body)
        let userData = new userModel({})
        let newUser = user(userData, req.body)
        newUser.save()
            .then(function(user) {
                res.json(user)
            })
            .catch(function(err) {
                next(err);
            })

    })
router.get('/login', function(req, res, next) {
    userModel.findOne({
            $or: [{
                    username: req.body.username,
                },
                {
                    email: req.body.username
                }
            ]
        })
        .exec(function(err, user) {
            if (err) {
                return next({ msg: 'invalid login credentials' });
            }
            if (user) {
                bcrypt.compare(req.body.password, user.password).then(function(result) {
                    if (result) {
                        let token = jwt.sign({ id: user._id }, jwtSecret)
                        res.json({ user, token })

                    } else {
                        next({ msg: 'invalid login credentials' })
                    }
                })
            }

        });
})
module.exports = router