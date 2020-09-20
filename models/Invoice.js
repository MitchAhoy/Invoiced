const mongoose = require('mongoose')
const { Schema } = mongoose

const invoiceSchema = new Schema({
    customer: String,
    email: String,
    deliverables: String,
    issueDate: Date,
    payableBy: Date,
    amount: Number,
    paid: Boolean,
    _user: String
})

mongoose.model('invoice', invoiceSchema)