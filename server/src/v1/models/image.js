const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const imageSchema = new Schema({
    image: {
        type: String
    },
}, schemaOptions);

module.exports = mongoose.model('Image', imageSchema);