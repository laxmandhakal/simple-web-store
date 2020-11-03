const router = require('express').Router();
const multer = require('multer');
const ItemCtrl = require('./itemControl');
// sample code
// const upload = multer({
//     dest: './uploads/'
// });
const myStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/files/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: myStorage,
    fileFilter: function(req, file, cb) {
        var mimeType = file.mimetype.split('/')[0];
        if (mimeType == 'image') {
            cb(null, true)
        } else {
            req.fileError = 'er';
            cb(null, false)
        }
    }
})
router.route('/')
    .get(ItemCtrl.find)
    .post(upload.single('img'), ItemCtrl.insert);


router.route('/:id')
    .get(ItemCtrl.findById)
    .put(upload.single('img'), ItemCtrl.update)
    .delete(ItemCtrl.remove);


module.exports = router;