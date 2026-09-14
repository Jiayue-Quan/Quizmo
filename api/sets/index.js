const UserModel = require('../../models/User.js')
const SetModel = require('../../models/Set.js')
const { userExtractor } = require("../../auth.js")
const dbConnect = require("../../lib/db.js")


const getSets = async (req, res) => {
    try {
        const extractedUser = await userExtractor(req)
        if (!extractedUser) {
            return res.status(401).json({
                error: "Invalid or missing token"
            })
        }
        const user = await UserModel.findOne({username: extractedUser.username})
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const sets = await SetModel.find({user: user.id})
        return res.json(sets)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" })
    }

}
const createSet = async (req, res) => {
    const {title, description, cards } = req.body
    try {
        const extractedUser = await userExtractor(req)
        if (!extractedUser) {
            return res.status(401).json({
                error: "Invalid or missing token"
            })
        }
        const set = await SetModel.create({
            title: title,
            description: description,
            cards: cards,
            //add creator's id to set properties
            user: extractedUser.id
    
        })

        const selectedUser = await UserModel.updateOne(
            {username: extractedUser.username},
            {$push: {sets: set.id}}
        )

        if (!selectedUser) {
            res.status(404).json({ error: "Invalid user" })
        }
        return res.json(set)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" })
    }
        
}

module.exports = async (req, res) => {
    await dbConnect()

    if (req.method === "GET") {
        return getSets(req, res)
    }
    if (req.method === "POST") {
        return createSet(req, res)
    }
    return res.status(405).json({ error: "Method not allowed" })
}