const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // db modeling state
    name: String,
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    role: {
        type: Number, //1 admin, 2 normal user
        default: 2
    },
    dob: Date,
    phoneNumber: Number,
    address: String,
    passwordResetExpiry: Date
}, {
    timestamps: true
});

const userModel = mongoose.model('user', UserSchema)

module.exports = userModel;