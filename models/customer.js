const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({


    customerId: {
        type: String,
        unique: true,
        // required : true
    },

    firstName: {
        type: String,
        // required : true
    },

    lastName: {
        type: String,
        // required : true
    },

    userName: {
        type: String,
        // required : true,
        unique: true
    },

    email: {
        type: String,
        // required : true,
        unique: true,
        index: true
    },

    phone: {
        type: String,
        // required : true,
        unique: true,

    },

    dob: {
        type: String,
        // required : true,


    },

    gender: {
        type: String,
        // required : true,

    },

    password: {
        type: String,
        // required : true,
    },

    confirmPassword: {
        type: String,
        // required : true,
    },

    image: {
        type: String,
        // required : true,
    },

})
module.exports = new mongoose.model("customer",customerSchema)