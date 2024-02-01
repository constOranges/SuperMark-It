const mongoose = require("mongoose");
const User = require("../models/user.model");
const Item = require("../models/item.model");
const cloudinary = require("../config/cloudinary");

// GENERAL ITEMS

module.exports.findItemById = (req, res) => {
  Item.findById(req.body.itemId)
    .then(currentItem => {
      res.json(currentItem);
    })
    .catch(err => res.status(400).json(err));
}

// CATEGORIES

module.exports.addItemToCategory = async (req, res) => {
  const { imagePath } = req.body;

  if (imagePath) {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "itemImages",
      width: 300,
      crop: "scale",
    });

    const newItem = await Item.create({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
      expDate: req.body.expDate,
      notifyDate: req.body.notifyDate,
      imagePath: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    User.updateOne(
      {
        _id: req.userId,
        "categories._id": req.body.categoryId,
      },
      {
        $push: {
          "categories.$.items": newItem,
        },
      },
      { new: true }
    )
      .then((user) => {
        res.status(200).json({ message: "Item created succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    const newItem = await Item.create({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
      expDate: req.body.expDate,
      notifyDate: req.body.notifyDate,
      // imagePath: req.body.imagePath, change this to be a default icon?
    });

    User.updateOne(
      {
        _id: req.userId,
        "categories._id": req.body.categoryId,
      },
      {
        $push: {
          "categories.$.items": newItem,
        },
      },
      { new: true }
    )
      .then((user) => {
        res.status(200).json({ message: "Item created succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports.existingItemToCategory = async (req, res) => {
  const currentItem = await Item.findById(
    req.body.itemId
  );

  User.updateOne(
    {
      _id: req.userId,
      "categories._id": req.body.categoryId,
    },
    {
      $push: {
        "categories.$.items": currentItem,
      },
    },
    { new: true }
  )
    .then((user) => {
      res.status(200).json({ message: "Item added successfully." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports.updateItemInCategory = async (req, res) => {
  const { imagePath } = req.body;

  if (imagePath) {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "itemImages",
      width: 300,
      crop: "scale",
    });

    const currentItem = await Item.findByIdAndUpdate(
      req.body.itemId,
      {
        itemName: req.body.itemName,
        brand: req.body.brand,
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        notifyDate: req.body.notifyDate,
        imagePath: {
          public_id: result.public_id,
          url: result.secure_url,
        },
      },
      { new: true }
    );

    User.updateOne(
      {
        _id: req.userId,
        "categories._id": req.body.categoryId,
      },
      {
        $set: {
          "categories.$.items": currentItem,
        }
      },
      { upsert: true }
    )
      .then((user) => {
        res.status(200).json({ message: "Item updated successfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  } else {
    const currentItem = await Item.findByIdAndUpdate(
      req.body.itemId,
      {
        itemName: req.body.itemName,
        brand: req.body.brand,
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        notifyDate: req.body.notifyDate,
      },
      { new: true }
    );

    User.updateOne(
      {
        _id: req.userId,
        "categories._id": req.body.categoryId,
      },
      {
        $set: {
          "categories.$.items": currentItem,
        }
      },
      { upsert: true }
    )
      .then((user) => {
        res.status(200).json({ message: "Item updated successfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }
}

// Consider adding more error handling
module.exports.removeItemFromCategory = async (req, res) => {
  try {
    const currentItem = await Item.findByIdAndDelete(
      req.body.itemId
    );

    await User.updateOne(
      {
        _id: req.userId,
        "categories._id": req.body.categoryId,
      },
      {
        $pull: {
          "categories.$.items": { _id: currentItem._id },
        },
      }
    );

    // deletes item permanently if no longer in use by any categories or lists
    // if (
    //   currentItem.inUseCategories.length === 0 &&
    //   currentItem.inUseLists.length === 0
    // ) {
    //   try {
    //     await Item.findByIdAndDelete(req.body.itemId);
    //     console.log("Item deleted permanently.");
    //   } catch (error) {
    //     console.error("Error deleting item permanently:", error.message);
    //   }
    // }

    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// LISTS

module.exports.addItemToList = async (req, res) => {
  const { imagePath } = req.body;

  if (imagePath) {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "itemImages",
      width: 300,
      crop: "scale"
    });

    const newItem = await Item.create({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
      expDate: req.body.expDate,
      notifyDate: req.body.notifyDate,
      imagePath: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    User.updateOne(
      {
        _id: req.userId,
        "lists._id": req.body.listId,
      },
      {
        $push: {
          "lists.$.items": newItem,
        },
      },
      { new: true }
    )
      .then((user) => {
        res.status(200).json({ message: "Item created succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    const newItem = await Item.create({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
      expDate: req.body.expDate,
      notifyDate: req.body.notifyDate,
      // imagePath: req.body.imagePath,
    });

    User.updateOne(
      {
        _id: req.userId,
        "lists._id": req.body.listId,
      },
      {
        $push: {
          "lists.$.items": newItem,
        },
      },
      { new: true }
    )
      .then((user) => {
        res.status(200).json({ message: "Item created succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

module.exports.existingItemToList = async (req, res) => {
  const currentItem = await Item.findById(
    req.body.itemId
  );

  User.updateOne(
    {
      _id: req.userId,
      "lists._id": req.body.listId,
    },
    {
      $push: {
        "lists.$.items": currentItem,
      },
    },
    { new: true }
  )
    .then((user) => {
      res.status(200).json({ message: "Item added successfully." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Consider adding more error handling
module.exports.removeItemFromList = async (req, res) => {
  try {
    const currentItem = await Item.findByIdAndDelete(
      req.body.itemId
    );

    await User.updateOne(
      {
        _id: req.userId,
        "lists._id": req.body.listId,
      },
      {
        $pull: {
          "lists.$.items": { _id: currentItem._id },
        },
      }
    );

    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
