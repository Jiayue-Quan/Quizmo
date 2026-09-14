require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.js')

const dbConnect = require("../lib/db.js")

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Invalid method. Expecting POST request." })
    }
    await dbConnect()
    const {email, password}  = req.body
    try {
        const user = await UserModel.findOne({
            email: email
        })
        if (!user) {
            return res.status(401).json("Invalid user")
        }
        const validPassword = bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(403).json("Incorrect password")
        }
        const userForToken = {
            email: email,
            username: user.username
        }

        const token = jwt.sign(
            userForToken,
            process.env.SECRET
        )   
        return res.status(200).send({token, username: user.username, email: email})
        
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" })
    }
    
    
}