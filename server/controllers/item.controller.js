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

    const newItem = new Item({
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

    try {
      await newItem.validate();

      await User.updateOne(
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
      );

      res.status(200).json({ message: "Item created succesfully." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    const newItem = new Item({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
      expDate: req.body.expDate,
      notifyDate: req.body.notifyDate,
    });

    try {
      await newItem.validate();

      await User.updateOne(
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
      );

      res.status(200).json({ message: "Item created succesfully." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports.existingItemToCategories = async (req, res) => {
  try {
    const { imagePath } = req.body;

    if (imagePath && !imagePath.public_id && !imagePath.url) {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "itemImages",
        width: 300,
        crop: "scale",
      });

      for (let categoryId of req.body.categories) {
        const duplicateItemWithNewId = new Item({
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

        await duplicateItemWithNewId.validate();

        await User.updateOne(
          {
            _id: req.userId,
            "categories._id": categoryId,
          },
          {
            $push: {
              "categories.$.items": duplicateItemWithNewId,
            },
          },
          { new: true }
        );
      }
    } else {
      for (let categoryId of req.body.categories) {
        const duplicateItemWithNewId = new Item({
          itemName: req.body.itemName,
          brand: req.body.brand,
          quantity: req.body.quantity,
          expDate: req.body.expDate,
          notifyDate: req.body.notifyDate,
          imagePath: req.body.imagePath,
        });

        await duplicateItemWithNewId.validate();

        await User.updateOne(
          {
            _id: req.userId,
            "categories._id": categoryId,
          },
          {
            $push: {
              "categories.$.items": duplicateItemWithNewId,
            },
          },
          { new: true }
        );
      }
    }
    res.status(200).json({ message: "Item(s) updated successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.updateItemInCategory = async (req, res, next) => {
  const { imagePath } = req.body;

  if (imagePath) {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "itemImages",
      width: 300,
      crop: "scale",
    });

    User.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: {
          "categories.$[category].items.$[item].itemName": req.body.itemName,
          "categories.$[category].items.$[item].brand": req.body.brand,
          "categories.$[category].items.$[item].quantity": req.body.quantity,
          "categories.$[category].items.$[item].expDate": req.body.expDate,
          "categories.$[category].items.$[item].notifyDate": req.body.notifyDate,
          "categories.$[category].items.$[item].imagePath": {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
      },
      {
        arrayFilters: [
          { "category._id": req.body.categoryId },
          { "item._id": req.body.itemId },
        ],
      }
    )
      .then((user) => {
        res.status(200).json({ message: "Item updated succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    // adjust query to update entire item once item collection refactoring is complete (on hold, could be unnecessary)
    User.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: {
          "categories.$[category].items.$[item].itemName": req.body.itemName,
          "categories.$[category].items.$[item].brand": req.body.brand,
          "categories.$[category].items.$[item].quantity": req.body.quantity,
          "categories.$[category].items.$[item].expDate": req.body.expDate,
          "categories.$[category].items.$[item].notifyDate": req.body.notifyDate,
        },
      },
      {
        arrayFilters: [
          { "category._id": req.body.categoryId },
          { "item._id": req.body.itemId },
        ],
      }
    )
      .then((user) => {
        res.status(200).json({ message: "Item updated succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

// Consider adding more error handling
module.exports.removeItemFromCategory = async (req, res) => {
  try {
    await User.updateOne(
      {
        _id: req.userId,
        "categories._id": req.body.categoryId,
      },
      {
        $pull: {
          "categories.$.items": { _id: req.body.itemId },
        },
      }
    );

    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.renewItem = async (req, res) => {
  User.updateOne(
    {
      _id: req.userId,
    },
    {
      $set: {
        "categories.$[category].items.$[item].expDate": req.body.expDate,
        "categories.$[category].items.$[item].notifyDate": req.body.notifyDate,
      },
    },
    {
      arrayFilters: [
        { category_id: req.body.categoryId },
        { "item._id": req.body.itemId },
      ],
    }
  )
    .then((user) => {
      res.status(200).json({ message: "Item renewed succesfully." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// LISTS

module.exports.addItemToList = async (req, res) => {
  const { imagePath } = req.body;

  if (imagePath) {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "itemImages",
      width: 300,
      crop: "scale",
    });

    const newItem = new Item({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
      imagePath: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    try {
      await newItem.validate();

      await User.updateOne(
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
      );

      res.status(200).json({ message: "Item created succesfully." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else {
    const newItem = new Item({
      itemName: req.body.itemName,
      brand: req.body.brand,
      quantity: req.body.quantity,
    });

    try {
      await newItem.validate();

      await User.updateOne(
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
      );

      res.status(200).json({ message: "Item created succesfully." });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports.existingItemToLists = async (req, res) => {
  try {
    const { imagePath } = req.body;

    if (imagePath && !imagePath.public_id && !imagePath.url) {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "itemImages",
        width: 300,
        crop: "scale",
      });

      for (let listId of req.body.lists) {
        const duplicateItemWithNewId = new Item({
          itemName: req.body.itemName,
          brand: req.body.brand,
          quantity: req.body.quantity,
          imagePath: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        });

        await duplicateItemWithNewId.validate();

        await User.updateOne(
          {
            _id: req.userId,
            "lists._id": listId,
          },
          {
            $push: {
              "lists.$.items": duplicateItemWithNewId,
            },
          },
          { new: true }
        );
      }
    } else {
      for (let listId of req.body.lists) {
        const duplicateItemWithNewId = new Item({
          itemName: req.body.itemName,
          brand: req.body.brand,
          quantity: req.body.quantity,
          imagePath: req.body.imagePath,
        });

        await duplicateItemWithNewId.validate();

        await User.updateOne(
          {
            _id: req.userId,
            "lists._id": listId,
          },
          {
            $push: {
              "lists.$.items": duplicateItemWithNewId,
            },
          },
          { new: true }
        );
      }
    }
    res.status(200).json({ message: "Item(s) updated successfully." });
  } catch {
    res.status(400).json({ error: "There was an error moving all items." });
  }
};

module.exports.updateItemInList = async (req, res, next) => {
  const { imagePath } = req.body;

  if (imagePath) {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "itemImages",
      width: 300,
      crop: "scale",
    });

    User.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: {
          "lists.$[list].items.$[item].itemName": req.body.itemName,
          "lists.$[list].items.$[item].brand": req.body.brand,
          "lists.$[list].items.$[item].quantity": req.body.quantity,
          "lists.$[list].items.$[item].imagePath": {
            public_id: result.public_id,
            url: result.secure_url,
          },
        },
      },
      {
        arrayFilters: [
          { "list._id": req.body.listId },
          { "item._id": req.body.itemId },
        ],
      }
    )
      .then((user) => {
        res.status(200).json({ message: "Item updated succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    User.updateOne(
      {
        _id: req.userId,
      },
      {
        $set: {
          "lists.$[list].items.$[item].itemName": req.body.itemName,
          "lists.$[list].items.$[item].brand": req.body.brand,
          "lists.$[list].items.$[item].quantity": req.body.quantity,
        },
      },
      {
        arrayFilters: [
          { "list._id": req.body.listId },
          { "item._id": req.body.itemId },
        ],
      }
    )
      .then((user) => {
        res.status(200).json({ message: "Item updated succesfully." });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

// Consider adding more error handling
module.exports.removeItemFromList = async (req, res) => {
  try {
    await User.updateOne(
      {
        _id: req.userId,
        "lists._id": req.body.listId,
      },
      {
        $pull: {
          "lists.$.items": { _id: req.body.itemId },
        },
      }
    );

    res.status(200).json({ message: "Item removed successfully." });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
