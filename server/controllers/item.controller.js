const mongoose = require("mongoose");
const User = require("../models/user.model");
const Item = require("../models/item.model");
const cloudinary = require("../config/cloudinary");

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
      inUseCategories: [req.body.categoryId],
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
      inUseCategories: [req.body.categoryId],
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
  const currentItem = await Item.findByIdAndUpdate(
    req.body.itemId,
    {
      $push: {
        inUseCategories: req.body.categoryId,
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

// Must discuss design choice of whether we want to keep items unique across categories and lists or 
// duplicate items for the sake of easier updating and deleting. For example, we may run into an issue
// where we want to update an item in one category but since it's being used by multiple categories,
// do we want it to get updated everywhere? Likely not, although there may be certain beneficial cases.
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

    User.findByIdAndUpdate(
      req.userId,
      {

      }
    )
  }

}

// Consider adding more error handling
module.exports.removeItemFromCategory = async (req, res) => {
  try {
    const currentItem = await Item.findByIdAndUpdate(
      req.body.itemId,
      {
        $pull: {
          inUseCategories: req.body.categoryId,
        },
      },
      { new: true }
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
    if (
      currentItem.inUseCategories.length === 0 &&
      currentItem.inUseLists.length === 0
    ) {
      try {
        await Item.findByIdAndDelete(req.body.itemId);
        console.log("Item deleted permanently.");
      } catch (error) {
        console.error("Error deleting item permanently:", error.message);
      }
    }

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
      inUseLists: [req.body.listId],
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
      imagePath: req.body.imagePath,
      inUseLists: [req.body.listId],
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
  const currentItem = await Item.findByIdAndUpdate(
    req.body.itemId,
    {
      $push: {
        inUseLists: req.body.listId,
      },
    },
    { new: true }
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
    const currentItem = await Item.findByIdAndUpdate(
      req.body.itemId,
      {
        $pull: {
          inUseLists: req.body.listId,
        },
      },
      { new: true }
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

    // deletes item permanently if no longer in use by any categories or lists
    if (
      currentItem.inUseCategories.length === 0 &&
      currentItem.inUseLists.length === 0
    ) {
      try {
        await Item.findByIdAndDelete(req.body.itemId);
        console.log("Item deleted permanently.");
      } catch (error) {
        console.error("Error deleting item permanently:", error.message);
      }
    }

    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
