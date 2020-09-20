const productModel = require('../models/product.model');
const fs = require('fs');
const path = require('path');

function map_item_req(item, itemDetails) {
    if (itemDetails.name)
        item.name = itemDetails.name;
    if (itemDetails.description)
        item.description = itemDetails.description;
    if (itemDetails.brand)
        item.brand = itemDetails.brand;
    if (itemDetails.category)
        item.category = itemDetails.category;
    if (itemDetails.price)
        item.price = itemDetails.price;
    if (itemDetails.tags) {
        item.tags = typeof(itemDetails.tags) === 'string' ?
            itemDetails.tags.split(',') :
            itemDetails.tags;
    }
    if (itemDetails.size)
        item.size = itemDetails.size;
    if (itemDetails.model)
        item.model = itemDetails.model;
    if (itemDetails.quantitiy)
        item.quantitiy = itemDetails.quantitiy;


    if (itemDetails.origin)
        item.origin = itemDetails.origin;

    item.discount = {
        discountedItem: itemDetails.discountedItem || false,
        discountType: itemDetails.discountedItem ? itemDetails.discountType : null,
        discountUnit: itemDetails.discountedItem ? itemDetails.discountUnit : null
    }

    return item;
}

function insert(req, res, next) {
    console.log('req.body.>>>>', req.body);
    console.log('req.file.>>>>', req.file);
    console.log('req.loggedin user', req.loggedInUser);
    if (req.fileError) {
        return next({
            msg: 'invalid file format using file filter'
        })
    }
    var newItem = new productModel({});
    var newMappedItem = map_item_req(newItem, req.body);
    if (req.file) {
        newMappedItem.image = req.file.filename;
    }
    newMappedItem.user = req.loggedInUser.id;
    newMappedItem.addedBy = req.loggedInUser.username;
    newMappedItem.save()
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function find(req, res, next) {
    console.log('req.loggedin user', req.loggedInUser);

    let condition = {};
    if (req.loggedInUser.role != 1) {
        condition.user = req.loggedInUser.id;
    }
    findQuery(condition)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function remove(req, res, next) {
    console.log('req.loggedin user', req.loggedInUser);

    productModel.findById(req.params.id)
        .then(function(item) {
            if (item) {
                item.remove(function(err, removed) {
                    if (err) {
                        return next(err);
                    }
                    res.json(removed);
                });
            } else {
                next({
                    msg: 'Item not found',
                    status: 404
                });
            }
        })
        .catch(function(err) {
            next(err);
        })
}

function update(req, res, next) {
    console.log('req.body', req.body);

    if (req.fileError) {
        return next({
            msg: 'file format error',
            status: 400
        })
    }
    productModel.findById(req.params.id)
        .exec(function(err, item) {
            if (err) {
                return next(err);
            }
            if (item) {
                var updatedMapItem = map_item_req(item, req.body);
                if (req.file) {
                    var oldImage = item.image;
                    updatedMapItem.image = req.file.filename
                }
                updatedMapItem.save(function(err, saved) {
                    if (err) {
                        return next(err);
                    }
                    if (req.file) {
                        fs.unlink(path.join(process.cwd(), 'uploads/files/' + oldImage), function(err, done) {
                            if (err) {
                                console.log('err');
                            } else {
                                console.log('success in remove');
                            }
                        })
                    }
                    res.json(saved);
                });
            } else {
                next({
                    msg: "Item not found",
                    status: 404
                })
            }
        })
}

function findById(req, res, next) {
    let condition = { _id: req.params.id };
    findQuery(condition)
        .then(function(data) {
            res.json(data[0]);
        })
        .catch(function(err) {
            next(err);
        })
}

function searchByGet(req, res, next) {
    var condition = {};
    var searchCondition = map_item_req(condition, req.query);
    findQuery(searchCondition)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function searchByPost(req, res, next) {
    console.log('body >>>', req.body);
    var condition = {};
    var searchCondition = map_item_req(condition, req.body);
    if (!req.body.discountedItem) {
        delete searchCondition.discount;
    }
    if (req.body.minPrice) {
        searchCondition.price = {
            $gte: Number(req.body.minPrice)
        }
    }
    if (req.body.maxPrice) {
        searchCondition.price = {
            $lte: Number(req.body.maxPrice)
        }
    }
    if (req.body.minPrice && req.body.maxPrice) {
        searchCondition.price = {
            $lte: Number(req.body.maxPrice),
            $gte: Number(req.body.minPrice)
        }
    }
    if (req.body.tags) {
        searchCondition = {
            tags: {
                $in: req.body.tags.split(',')
            }
        }
    }
    console.log('search after condition >>', searchCondition);
    findQuery(searchCondition)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        })
}

function findQuery(condition) {
    return productModel.find(condition)
        .sort({
            _id: -1
        })
        .populate('user', { role: 1, username: 1 })
        .exec();

}

module.exports = {
    insert,
    find,
    remove,
    update,
    findById,
    searchByGet,
    searchByPost
}