const mongoose = require("mongoose");

const currentDate = new Date();

const ItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required."],
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    expDate: {
      type: Date,
      min: [
        currentDate.getDate(),
        "Expiration date must be some time in the future.",
      ],
    },
    notifyDate: {
      type: Date,
      min: [
        currentDate.getDate(),
        "Notification date must be some time in the future.",
      ],
    },
    imagePath: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: false, collection: false }
);

module.exports = mongoose.model("Item", ItemSchema);
