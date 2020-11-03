const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ItemSchema = new Schema({
    name: {
        type: String,
        lowercase: true
    },
    description: String,
    tags: [String],
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    brand: {
        type: String
    },
    discount: {
        discountedItem: Boolean,
        discountType: {
            type: String
        },
        discountUnit: String
    },
    model: String,
    size: String,
    quantity: Number,
    image: String,
    origin: String,
    user: {
        type: Schema.Types.ObjectID,
        ref: 'user'
    },
    addedBy: String
}, {
    timestamps: true
});

module.exports = mongoose.model('item', ItemSchema);