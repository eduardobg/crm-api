//const { Schema, model } = require ('mongoose');
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: [true,'Name required']
    },
    email: {
        type: String,
        required: [true,'Email required']
    },
    password: {
        type: String,
        required: [true,'Password required'],
        unique: false
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//module.exports = model('Users')
module.exports = mongoose.model('User', userSchema);