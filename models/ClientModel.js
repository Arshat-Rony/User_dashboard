const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const clientSchema = new Schema({
    businessCategory: {
        type: String,
    },
    city: {
        type: String,
    },
    companyname: {
        type: String,
    },
    email: {
        type: String,
    },
    faculty: {
        type: String,
    },
    gstnumber: {
        type: Number,
    },
    mobile: {
        type: Number,
    },
    picture: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    state: {
        type: String,
    },
    website: {
        type: String,
    },
    clientid: {
        type: String
    }


})


const ClientModel = mongoose.model('Client', clientSchema);
module.exports = ClientModel;