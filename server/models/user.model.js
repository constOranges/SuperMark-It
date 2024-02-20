const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Item = require('./item.model');
const Category = require('./category.model');
const List = require('./list.model');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required."],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email."
        }
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 characters."]
    },
    categories: {
        type: [
            Category.schema
        ],
        default: [
            {
                categoryName: "Fridge",
                iconPath: "kitchen",
                items: []
            },
            {
                categoryName: "Freezer",
                iconPath: "icecream",
                items: []
            },
            {
                categoryName: "Pantry",
                iconPath: "breakfast",
                items: []
            }
        ]
    },
    lists: {
        type: [
            List.schema
        ],
        default: [
            {
                listName: "Favorites",
                iconPath: "favorites",
                deletable: "UNDELETABLE",
                items: []
            }
        ]
    }
}, { timestamps: true });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password.');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);