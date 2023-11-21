const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');

module.exports.addCategory = (req, res) => {
    const newCategory = {
        categoryName: req.body.categoryName,
        iconPath: req.body.iconPath, // adjust for filepath later
        items: []
    }
    User.findByIdAndUpdate(req.userId,
        {
            $push: {
                categories: newCategory
            }
    }).then(user => {
        res.status(200).json({ message: "Category created succesfully." });
    }).catch(err => {
        res.status(400).json(err);
    })
}

module.exports.removeCategory = (req, res) => {
    User.findByIdAndUpdate(req.userId,
        {
            $pull:
            { categories: 
                { '_id': req.params.id } // check if this needs to be a Mongo ObjectID
            }
    }).then(user => {
        res.status(200).json({ message: "Category removed succesfully." });
    }).catch(err => {
        res.status(400).json(err);
    })
}

// Ask whether to have separate routes for name and icon or just one update route
module.exports.renameCategory = (req, res) => {

}