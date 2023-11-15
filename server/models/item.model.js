const mongoose = require('mongoose');

const currentDate = new Date();

const ItemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: [true, "Item name is required."]
    },
    brand: {
        type: String
    },
    quantity: {
        type: Number
    },
    expDate: {
        type: Date,
        min: [currentDate.getDate(), "Expiration date must be some time in the future."]
    },
    notifyDate: {
        type: Date,
        min: [currentDate.getDate(), "Notification date must be some time in the future."]
    },
    imagePath: {
        type: String
    },
    // when creating a user, create the All category and add it to their schema
    categories: [],
    lists: []
}, {timestamps: true});

module.exports = mongoose.model('Item', ItemSchema);