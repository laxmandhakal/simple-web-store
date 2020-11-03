const router = require("express").Router();


const authorize = require('./commonRoute/authorize');
const userRoute = require('./route/userRoute');
const productRoute = require('./route/productRoute')
const productSearch = require('.//route/productSearch')


// router.use('/auth', authenticate);
// router.use('/autho', authorize);
router.use('/user', userRoute);
router.use('/product', productSearch)
router.use('/product', authorize, productRoute)


module.exports = router;