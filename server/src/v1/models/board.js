const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { schemaOptions } = require('./modelOptions');

const boardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    icon: {
        type: String,
        default: '📜'
    },
    title: {
        type: String,
        default: 'Sans titre'
    },
    description: {
        type: String,
        default: `Ajouter la description ici
        🟢 Vous pouvez rentrer une description sur plusieurs lignes
        🟢 Let's go...`
    },
    position: {
        type: Number
    },
    favourite: {
        type: Boolean,
        default: false
    },
    favouritePosition: {
        type: Number,
        default: 0
    }
}, schemaOptions)

module.exports = mongoose.model('Board', boardSchema);