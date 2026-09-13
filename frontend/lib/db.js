require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB URI")
}
mongoose.connect(MONGODB_URI)

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null
    }
}

const dbConnect = async () => {
    if (cached.conn) {
        console.log("Already connected to MongoDB")
        return cached.conn
    }
    if (cached.promise) {
        cached.promise = await mongoose.connect(MONGODB_URI)
    }
    cached.conn = await cached.promise
    return cached.conn   
}
module.exports = dbConnect
