const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');

module.exports.addItemToCategory = async (req, res) => {
    const newItem = await Item.create({
        itemName: req.body.itemName,
        brand: req.body.brand,
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        notifyDate: req.body.notifyDate,
        imagePath: req.body.imagePath, // alter to use filepath
    });

    User.updateOne({
        "_id": req.userId,
        "categories._id": req.params.id 
    }, {
        $push: {
            "categories.$.items": newItem
        }
    }, {new: true}).then(user => {
        res.status(200).json({ message: "Item created succesfully." });
    }).catch(err => {
        res.status(400).json(err);
    })
}