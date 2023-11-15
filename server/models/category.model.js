const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, "Category name is required."]
    },
    // consider using enum to have set options for icons
    iconPath: {
        type: String,
        required: [true, "Category icon is required."]
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);