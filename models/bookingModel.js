// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const bookingSchema = new mongoose.Schema({
    _id: { type: Number },
    BookingId: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Booking ID should be unique",
    },
    BookingDate: {
        type: Date,
        required: "Booking date",
        trim: true,
    },
    BookingNo: {
        type: String,
        trim: true,
        default: "LJ888",
    },
    TravelerCount: {
        type: Number,
        required: "Number of travelers",
        trim: true,
    },
    TripTypeId: {
        type: String,
        default: "B",
        trim: true,
    },
    CustomerId: { type: Number, ref: "User" },
    PackageId: { type: Number, ref: "Package" }
});

bookingSchema.plugin(uniqueValidator);
module.exports.Booking = mongoose.model('Booking', bookingSchema);