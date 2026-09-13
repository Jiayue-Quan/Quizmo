const UserModel = require('../models/User.js')
const dbConnect = require("../lib/db.js")

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Invalid method. Expecting GET request." })

    }
    await dbConnect()

    try {
        const users = await UserModel.find({})
        return res.json(users)
    }
    catch  (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" })
    }
    
}