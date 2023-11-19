const mongoose = require('mongoose');
const Item = require('./item.model');

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category name is required."]
    },
    // consider using enum to have set options for icons
    iconPath: {
        type: String,
        required: [true, "Category icon is required."]
    },
    items: [Item.schema]
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);