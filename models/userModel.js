// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    _id: { type: Number },
    username: {
        type: String,
        required: "Username is required",
        trim: true,
        unique: "That user name is taken, please a differnt user name",
        lowercase: true,
    },
    userid: {
        type: Number,
        unique: "Userid needs to be unique.  Please try again ...",
        default: null,
    },
    firstname: {
        type: String,
        required: "Please enter your first name.",
        trim: true,
    },
    lastname: {
        type: String,
        required: "Please enter your last name.",
        trim: true,
    },
    email: {
        type: String,
        required: 'Please enter your email address',
        trim: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`,
        },
    },
    phone: {
        type: String,
        required: 'Please enter your phone number',
        trim: true,
        validate: {
            validator: function (v) {
                return /^[+]?(1\\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g.test(v);
            },
            message: props => `${props.value} is not a valid phone number`,
        },
    },
    password: {
        type: String,
        required: "Please enter a password",
        trim: true,
        validate: {
            validator: function (v) {
                return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/.test(v);
            },
            message: (props) =>
                `Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 6 characters.`,
        },
    },
    role: {
        type: String,
        trim: true,
        default: "customer",
    },
    // more fields defined below
});

userSchema.plugin(uniqueValidator);
module.exports.User = mongoose.model('User', userSchema);
