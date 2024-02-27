const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');
const List = require('../models/list.model');

module.exports.addList = async (req, res) => {
    try {
        const newList = new List({
            listName: req.body.listName,
            iconPath: req.body.iconPath,
            deletable: "",
            items: []
        })

        await newList.validate();

        await User.findByIdAndUpdate(req.userId,
            {
                $push: {
                    lists: newList
                }
            }, { new: true }
        )

        res.status(200).json({ message: "List created succesfully." });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.removeList = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(req.userId);
        const listToDelete = user.lists.id(req.body.listId);

        if (listToDelete.deletable === "UNDELETABLE") {
            throw new Error("The favorites list cannot be deleted.")
        }

        User.findByIdAndUpdate(req.userId,
            {
                $pull:
                {
                    lists:
                        { '_id': req.body.listId }
                }
            }).then(user => {
                console.log("List deleted successfully from user document.");
            }).catch(err => console.log(err))

        // CODE REMOVED DUE TO ITEM COLLECTION NO LONGER IN USE
        // Item.find({ inUseIDs: { $in: [req.body.listId] }})
        //     .then(async items => {
        //         for (const item of items) {
        //             let returnedItem = await Item.findByIdAndUpdate(
        //                 item._id,
        //                 { $pull: { inUseIDs: req.body.listId } },
        //                 { new: true }
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
        res.status(200).json({ message: "List removed succesfully." });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ error: err.message });
    }
}

module.exports.editList = async (req, res) => {
    try {
        const updatedList = new List({
            listName: req.body.listName,
            iconPath: req.body.iconPath,
            items: []
        })

        await updatedList.validate();

        await User.updateOne(
            {
                _id: req.userId,
            },
            {
                $set: {
                    "lists.$[list].listName": req.body.listName,
                    "lists.$[list].iconPath": req.body.iconPath,
                },
            },
            {
                arrayFilters: [{ "list._id": req.body.listId }],
                new: true,
            },
        )
        
        res.status(200).json({ message: "List updated successfully. "});
    } catch (err) {
        res.status(400).json(err);
    }
}