const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const contactUsSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: "Please enter your full name.",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
        required: 'Please enter your email address'
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[+]?(1\\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: 'Please enter your phone number'
    },
    comments: {
        type: String,
        required: "Please write us a comment.",
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 5;
            },
            message: (props) => `Your comments are too short.  Tell us more!`,
        },

    },
});

contactUsSchema.plugin(uniqueValidator);
module.exports.ConctactUs = mongoose.model('ConctactUs', contactUsSchema);