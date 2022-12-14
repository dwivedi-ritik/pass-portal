import mongoose from "mongoose";

const { Schema } = mongoose

const gatePass = Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    email: {
        type: String
    },
    parentsNo: {
        type: Number
    },
    reason: {
        type: String,
    },
    roomNo: {
        type: Number
    },
    year: {
        type: Number
    },
    status: {
        type: String
    },
    branch: {
        type: String
    },
    departure: {
        type: Date,
    },
    arrival: {
        type: Date
    },
    token: {
        type: String
    }
},
    {
        timestamps: true

    })

module.exports = mongoose.models.GetPass || mongoose.model('GetPass', gatePass);


