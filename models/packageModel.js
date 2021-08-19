// Require the mongoose module
const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const packageSchema = new mongoose.Schema({
    _id: { type: Number },
    PackageId: {
        type: Number,
        required: "Required",
        trim: true,
        unique: "Package ID should be unique",
    },
    PkgName: {
        type: String,
        required: "Enter package name",
        trim: true,
        unique: "Package name should be unique",
    },
    PkgStartDate: {
        type: Date,
        required: "Select start date",
        trim: true,
    },
    PkgEndDate: {
        type: Date,
        required: "Select end date",
        trim: true,
    },
    PkgDesc: {
        type: String,
        required: "Package description",
        trim: true,
    },
    PkgBasePrice: {
        type: Number,
        required: "Package base price",
        trim: true,
    },
    PkgAgencyCommission: {
        type: Number,
        required: "Agency package commission",
        trim: true,
    },
    ImgPath: {
        type: String,
        trim: true,
    }
});

packageSchema.plugin(uniqueValidator);
module.exports.Package = mongoose.model('Package', packageSchema);