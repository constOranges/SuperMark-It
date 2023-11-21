const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');

module.exports.addItemToCategory = (req, res) => {
    const newItem = Item.create({
        itemName: req.body.itemName,
        brand: req.body.brand,
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        notifyDate: req.body.notifyDate,
        imagePath: req.body.imagePath, // alter to use filepath
    });

    User.findById(req.userId)
}