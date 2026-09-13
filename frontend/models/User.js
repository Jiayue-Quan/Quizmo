const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: {type: String, unique: true},
    sets: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sets'}
    ]
})
UserSchema.plugin(uniqueValidator)
UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel