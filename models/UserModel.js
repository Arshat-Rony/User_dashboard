const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    }
    ,
    mobile: {
        type: String
    },
    email: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema)


module.exports = User;