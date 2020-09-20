const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema({
    name: String,
    email: String,
    address: String,
    stripeID: String,
    _user: String
})

mongoose.model('customer', customerSchema)