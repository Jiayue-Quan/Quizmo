const SetModel = require('../../models/Set.js')
const { userExtractor } = require("../../auth.js")
const dbConnect = require("../../lib/db.js")

const getSet = async (req, res) => {
    const {setId} = req.query
    try {
        const set = await SetModel.findById(setId)

        return res.json(set)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" })
    }
    
}

const deleteSet = async (req, res) => {
    const {setId} = req.query
    try {
        const extractedUser = await userExtractor(req)
        if (!extractedUser) {
            return res.status(401).json({
                error: "Invalid or missing token"
            })
        }
        const set = await SetModel.findOneAndDelete({
                _id: setId,
                user: extractedUser.id
        })
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
        return getSet(req, res)
    }
    if (req.method === "DELETE") {
        return deleteSet(req, res)
    }
    return res.status(405).json({ error: "Method not allowed" })
    
}