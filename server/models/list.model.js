const mongoose = require('mongoose');
const Item = require('./item.model');

const ListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: [true, "List name is required."],
    },
    iconPath: {
        type: String,
        required: [true, "List icon is required."],
    },
    deletable: {
        type: String
    },
    items: [Item.schema]
}, { timestamps: false, collection: false });

module.exports = mongoose.model('List', ListSchema);