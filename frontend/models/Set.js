const mongoose = require('mongoose')

const SetSchema = new mongoose.Schema({
    title: String,
    description: String,
    cards: [{
        front: String,
        back: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    
    }
}) 
SetSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const SetModel = mongoose.model('sets', SetSchema)
module.exports = SetModel