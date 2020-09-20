// gathering requirements
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
// running database
require('./db')
    // routing middleware
const apiRoute = require('./apiRoute')
    // initializing express
var app = express();
app.set('port', 9000);
// third party middleware
app.use(logger('dev'));
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute)

app.use(function(req, res, next) {
    console.log("I am 404 error handling middleware")
    next({
        msg: 'not found',
        error: 404
    })
})
app.use(function(err, req, res, next) {
    console.log(' i am error handling  middleware', err);
    res.status(err.status || 400);
    res.json({
        msg: err.msg || err,
        status: err.status || 400
    });
});
app.listen(app.get('port'), function(err, done) {
    if (err) {
        console.log('port listening error')
    } else {
        console.log('listening success 9000 port')
    }
})