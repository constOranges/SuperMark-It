const mongoose = require("mongoose");
const User = require("../models/user.model");
const Item = require("../models/item.model");
const moment = require("moment-timezone");

function timezoneConversion(itemDate, userTimezone) {
    const itemDateMoment = moment.utc(itemDate);
    const convertedMoment = itemDateMoment.clone().tz(userTimezone, true);
    console.log(itemDate, userTimezone, convertedMoment.toISOString());
    return convertedMoment.toISOString();
};

module.exports.pushNotificationsToArray = async () => {
    const allUsers = await User.find();

    const currentDate = new Date();
    const currentISO = currentDate.toISOString().slice(0, 13);

    console.log(`Scheduled push notification task ran at: ${currentDate}`);

    for (let user of allUsers) {
        let itemsToNotify = [];
        user.categories.forEach(category => {
            category.items.forEach(item => {
                if (item.notifyDate && item.expDate) {
                    let adjustedNotifyDate = timezoneConversion(item.notifyDate, user.timezone);
                    let adjustedExpDate = timezoneConversion(item.expDate, user.timezone);
                    let notifyISO = adjustedNotifyDate.slice(0, 13);
                    let expISO = adjustedExpDate.slice(0, 13);
                    console.log(notifyISO, expISO, currentISO);
                    if (notifyISO === currentISO || expISO === currentISO) {
                        itemsToNotify.push({
                            itemId: item._id,
                            itemName: item.itemName,
                            expDate: item.expDate,
                            imagePath: item.imagePath
                        });
                    }
                }
            })
        });

        await User.findByIdAndUpdate(user._id,
            {
                $push: {
                    "notifications": {
                        $each: itemsToNotify
                    }
                }
            }
        );
    }
}

module.exports.deleteNotificationById = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $pull: {
                notifications: {
                    '_id': req.body.notificationId
                }
            }
        })
        res.status(200).json({ message: "Notification removed successfully. " })
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports.clearAllNotifications = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $set: {
                "notifications": []
            }
        })
        res.status(200).json({ message: "Notifications cleared successfully." });
    } catch (err) {
        res.status(400).json(err);
    }
}