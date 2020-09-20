const router = require('express').Router()
const ItemCtrl = require('./itemControl')


router.route('/search')
    .get(ItemCtrl.searchByGet) // req.query
    .post(ItemCtrl.searchByPost); // req.body

module.exports = router