const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name     : String,
    whatsapp : String,
    email    : String,
    userId   : String,
})

module.exports = mongoose.model('Customer', CustomerSchema)