const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true },
    time: { type: Date },
    exhcange: { type: String }
})

module.exports = model('Receipt', schema)