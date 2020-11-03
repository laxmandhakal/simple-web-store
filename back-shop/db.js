const mongoose = require("mongoose");
let dbURL;
dbURL = "mongodb://localhost:27017/laxman";

mongoose.connect(
    dbURL, { useUnifiedTopology: true, useNewUrlParser: true },
    function(err, done) {
        if (err) {
            console.log("db connection failed");
        } else {
            console.log("db connection success");
        }
    }
);