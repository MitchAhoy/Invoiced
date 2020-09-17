const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
    _user: String,
    name: String,
    email: String,
    address: String
})

mongoose.model('customer', customerSchema)