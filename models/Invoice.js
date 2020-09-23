const mongoose = require('mongoose')
const { Schema } = mongoose

const invoiceSchema = new Schema({
    customer: String,
    customerEmail: String,
    invoiceId: String,
    customerId: String,
    description: String,
    issueDate: Number,
    payableBy: Number,
    amount: Number,
    status: String,
    invoiceUrl: String,
    invoicePdf: String,
    _user: String
})

mongoose.model('invoice', invoiceSchema)