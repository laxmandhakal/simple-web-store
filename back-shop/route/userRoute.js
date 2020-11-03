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
        hash = bcrypt.hashSync(reqBody.password, 5);
        mapData.password = hash

    }
    return mapData
}
router.get('/contact/:id', function(req, res, next) {
    console.log("id>>", req.params.id);
    userModel.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => next(err))

})


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
router.post('/login', function(req, res, next) {
    console.log("request>>", req.body);
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
                console.log("error", err);
                return next({ msg: 'invalid login credentials' });

            }
            if (user) {
                console.log("user>>", user)
                bcrypt.compare(req.body.password, user.password).then(function(result) {
                    if (result) {
                        let token = jwt.sign({ id: user._id }, jwtSecret)
                        res.json({ user, token })

                    } else {
                        next({ msg: 'invalid login credentials' })
                    }
                })
            } else {
                next({ msg: "invalid login credential" })
            }

        });
})
module.exports = router