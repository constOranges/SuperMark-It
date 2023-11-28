const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');

// CATEGORIES

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
        "categories._id": req.body.categoryId
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

module.exports.removeItemFromCategory = async (req, res) => {
    const currentItem = await Item.findById(req.body.itemId);

    User.updateOne({
        "_id": req.userId,
        "categories._id": req.body.categoryId
    }, {
        $pull: {
            "categories.$.items": currentItem
        }
    }, {new: true}).then(user => {
        res.status(200).json({ message: "Item removed succesfully." });
    }).catch(err => {
        res.status(400).json(err);
    })
}

// LISTS

module.exports.addItemToList = async (req, res) => {
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
        "lists._id": req.body.listId
    }, {
        $push: {
            "lists.$.items": newItem
        }
    }, {new: true}).then(user => {
        res.status(200).json({ message: "Item created succesfully." });
    }).catch(err => {
        res.status(400).json(err);
    })
}

module.exports.removeItemFromList = async (req, res) => {
    const currentItem = await Item.findById(req.body.itemId);

    User.updateOne({
        "_id": req.userId,
        "lists._id": req.body.listId
    }, {
        $pull: {
            "lists.$.items": currentItem
        }
    }, {new: true}).then(user => {
        res.status(200).json({ message: "Item removed succesfully." });
    }).catch(err => {
        res.status(400).json(err);
    })
}