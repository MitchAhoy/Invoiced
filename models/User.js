const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    firstName: String,
    lastName: String,
    email: String,
    profileImage: String,
    credits: { type: Number, default: 0 },
    verified: Boolean
})

mongoose.model('user', userSchema)