const bcrypt = require('bcryptjs')
const UserModel = require('../models/User.js')

const dbConnect = require("../lib/db.js")
const mongoose = require("mongoose")

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Invalid method. Expecting POST request." })
    }

    await dbConnect()

    const {email, password, user} = req.body

    try {
        const hash = await bcrypt.hash(password, 10)
        const users = await UserModel.create({
            email, 
            password: hash, 
            username: user
        })
        return res.json(users)
    }
    catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            return res.json(403).json("Duplicate Username")
        }
        else {
            console.log(err)
            return res.json(500).json({ error: `Server error`})
        }
    }
}
