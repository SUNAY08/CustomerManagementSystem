const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({


    addressId: {
        type: String,
        unique: true,
        
    },

    customerId: {
        type: String,
        unique: true,

        
    },

    address: {
        type: String,
        
    },

    landmark: {
        type: String,
        
    },

    city: {
        type: String,
        
    },

    state: {
        type: String,
        
    },

    country: {
        type: String,
        
    },

    zipcode: {
        type: Number,
        


    },


},{timestamp : true})
module.exports = new mongoose.model("address",addressSchema)