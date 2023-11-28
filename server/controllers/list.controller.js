const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');

module.exports.addList = (req, res) => {
    const newList = {
        listName: req.body.listName,
        iconPath: req.body.iconPath, // adjust for filepath later
        items: []
    }
    User.findByIdAndUpdate(req.userId,
        {
            $push: {
                lists: newList
            }
        }, { new: true }).then(user => {
            res.status(200).json({ message: "List created succesfully." });
        }).catch(err => {
            res.status(400).json(err);
        })
}

module.exports.removeList = (req, res) => {
    User.findByIdAndUpdate(req.userId,
        {
            $pull:
            {
                lists:
                    { '_id': req.params.id } // can change to request body if necessary
            }
        }).then(user => {
            res.status(200).json({ message: "Category removed succesfully." });
        }).catch(err => {
            res.status(400).json(err);
        })
}