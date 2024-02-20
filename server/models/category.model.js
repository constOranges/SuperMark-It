const mongoose = require('mongoose');
const Item = require('./item.model');

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category name is required."],
    },
    iconPath: {
        type: String,
        required: [true, "Category icon is required."],
    },
    items: [Item.schema]
}, { timestamps: false, collection: false });

module.exports = mongoose.model('Category', CategorySchema);