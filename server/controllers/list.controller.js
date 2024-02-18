const mongoose = require('mongoose');
const User = require('../models/user.model');
const Item = require('../models/item.model');

module.exports.addList = (req, res) => {
    const newList = {
        listName: req.body.listName,
        iconPath: req.body.iconPath,
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

module.exports.removeList = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
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

        Item.find({ inUseIDs: { $in: [req.body.listId] }})
            .then(async items => {
                for (const item of items) {
                    let returnedItem = await Item.findByIdAndUpdate(
                        item._id,
                        { $pull: { inUseIDs: req.body.listId } },
                        { new: true }
                    );

                    // deletes item permanently if no longer in use by any categories or lists
                    if (returnedItem.inUseIDs.length === 0) {
                        try {
                            await Item.findByIdAndDelete(item._id);
                            console.log("Item deleted permanently.");
                        } catch (err) {
                            console.error("Error deleting item permanently:", err.message);
                        }
                    }
                }
                console.log("Items updated successfully.");
            }).catch(err => console.log(err))

        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ message: "List removed succesfully." });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json(err);
    }
}

module.exports.editList = (req, res) => {
  User.updateOne(
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
    }
  )
    .then((user) => {
      res.status(200).json({ message: "List updated succesfully." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};