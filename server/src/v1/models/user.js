const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    verified: {
        type: Boolean,
        default: false
    },
}, schemaOptions);

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id}, process.env.TOKEN_SECRET_KEY,{ expiresIn: '6h' });
    return token;
}

module.exports = mongoose.model('User', userSchema)
