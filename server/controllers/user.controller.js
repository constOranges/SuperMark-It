const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const secret = process.env.JWT_KEY;

module.exports.findOneUser = (req, res) => {
    User.findById(req.userId)
        .then(oneUser => {
            const { password, ...userInfo } = oneUser._doc;
            res.json({ user: userInfo });
        })
        .catch(err => res.json({ message: "Something went wrong retrieving user information.", error: err }));
}

module.exports.createUser = (req, res) => {
    User.create(req.body)
        .then(user => {
            const userToken = jwt.sign({
                id: user._id
            }, secret);

            const { password, ...userInfo } = user._doc;

            res
                .cookie("usertoken", userToken, {
                    httpOnly: true,
                    sameSite: true,
                    partitioned: true
                })
                .json({ user: userInfo });
        })
        .catch(err => res.status(400).json(err));
}

module.exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        return res.status(400).send("The specified email could not be found.");
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        return res.status(400).send("The password you entered is incorrect.");
    }

    const userToken = jwt.sign({
        id: user._id
    }, secret);

    const { password, ...userInfo } = user._doc;

    res
        .cookie("usertoken", userToken, {
            httpOnly: true,
            sameSite: true,
            partitioned: true
        })
        .json({ user: userInfo });
}

module.exports.logout = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

module.exports.updateUser = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword, email, timezone } = req.body;

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                errors: {
                    userNotFound: {
                        message: "User information not found. Please reload the page."
                    }
                }
            });
        }

        const passwordCheck = await bcrypt.compare(oldPassword, user.password);
        if (!passwordCheck) {
            return res.status(401).json({
                errors: {
                    passwordMatch: {
                        message: "The current password you entered is incorrect."
                    }
                }
            });
        } else {
            user.password = oldPassword;
        }

        if (email) {
            user.email = email;
        }
        if (timezone) {
            user.timezone = timezone;
        }
        if (newPassword) {
            user.confirmPassword = confirmPassword;
            // password is hashed in model validations
            user.password = newPassword;
            await user.save();
        } else {
            await user.save({ validateBeforeSave: false });
        }

        res.status(200).json({ message: "User updated successfully." });
    } catch (err) {
        // Fix error handling
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if (!passwordCheck) {
            return res.status(401).json({ error: "The password you entered is incorrect." });
        }

        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        // Fix error handling
        console.log(err);
        res.status(400).json(err);
    }
}