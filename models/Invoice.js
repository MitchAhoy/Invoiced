const mongoose = require('mongoose')
const { Schema } = mongoose

const invoiceSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    deliverables: String,
    issuedDate: Date,
    dueDate: Date,
    amount: Number,
    paid: Boolean,
    _user: String
})

mongoose.model('invoice', invoiceSchema)