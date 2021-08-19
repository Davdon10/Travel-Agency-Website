// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const bookingdetailSchema = new mongoose.Schema({
    _id: { type: Number },
    BookingdetailId: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Booking detail ID should be unique",
    },
    ItineraryNo: {
        type: Number,
        required: "Required",
        trim: true,
        default: 306,
    },
    Tripstart: {
        type: Date,
        required: "Trip start date",
        trim: true,
    },
    Tripend: {
        type: Date,
        required: "Trip end date",
        trim: true,
    },
    Description: {
        type: String,
        required: "Enter description",
        default: "Vacation Description",
        trim: true,
    },
    Destination: {
        type: String,
        required: "Enter destination",
        default: "Vacation Destination",
        trim: true,
    },
    BasePrice: {
        type: Number,
        required: "Base price",
        trim: true,
    },
    AgencyCommission: {
        type: Number,
        required: "Agency booking detail commission",
        default: 100,
        trim: true,
    },
    BookingId: { type: Number, ref: "Booking", default: null },
    RegionId: {
        type: String,
        required: "Required",
        trim: true,
        default: 'EU',
    },
    ClassId: {
        type: String,
        required: "Class Id",
        trim: true,
        default: "ECN",
    },
    FeeId: {
        type: String,
        required: "Fee Id",
        trim: true,
        default: 'GR',
    },
    ProductSupplierId: {
        type: Number,
        required: "Product supplier Id",
        trim: true,
        default: 14,
    },
});

bookingdetailSchema.plugin(uniqueValidator);
module.exports.Bookingdetail = mongoose.model('Bookingdetail', bookingdetailSchema);