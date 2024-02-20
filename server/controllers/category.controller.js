const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');
const Category = require('../models/category.model');

module.exports.addCategory = async (req, res) => {
    try {
        const newCategory = new Category({
            categoryName: req.body.categoryName,
            iconPath: req.body.iconPath,
            items: []
        })

        await newCategory.validate();

        await User.findByIdAndUpdate(req.userId,
            {
                $push: {
                    categories: newCategory
                }
            }, { new: true }
        )

        res.status(200).json({ message: "Category created succesfully." });
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports.removeCategory = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        User.findByIdAndUpdate(req.userId,
            {
                $pull:
                {
                    categories:
                        { '_id': req.body.categoryId }
                }
            }).then(user => {
                console.log("Category deleted successfully from user document.");
            }).catch(err => console.log(err))

        // CODE REMOVED DUE TO ITEM COLLECTION NO LONGER IN USE
        // Item.find({ inUseIDs: { $in: [req.body.categoryId] } })
        //     .then(async items => {
        //         for (const item of items) {
        //             let returnedItem = await Item.findByIdAndUpdate(
        //                 item._id,
        //                 { $pull: { inUseIDs: req.body.categoryId } },
        //                 { new: true }
        0
        //             );

        //             // deletes item permanently if no longer in use by any categories or lists
        //             if (returnedItem.inUseIDs.length === 0) {
        //                 try {
        //                     await Item.findByIdAndDelete(item._id);
        //                     console.log("Item deleted permanently.");
        //                 } catch (err) {
        //                     console.error("Error deleting item permanently:", err.message);
        //                 }
        //             }
        //         }
        //         console.log("Items updated successfully.");
        //     }).catch(err => console.log(err))

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "Category removed succesfully." });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json(err);
    }
}

module.exports.editCategory = (req, res) => {

    User.updateOne(
        {
            _id: req.userId,
        },
        {
            $set: {
                "categories.$[category].categoryName": req.body.categoryName,
                "categories.$[category].iconPath": req.body.iconPath,
            },
        },
        {
            arrayFilters: [{ "category._id": req.body.categoryId }],
            new: true,
        },

    )
        .then((user) => {
            res.status(200).json({ message: "Category updated succesfully." });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}