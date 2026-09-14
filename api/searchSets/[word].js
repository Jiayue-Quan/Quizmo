const SetModel = require('../../models/Set.js')
const UserModel = require("../../models/User.js")
const dbConnect = require("../../lib/db.js")

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Invalid method. Expecting GET request." })
    }
    await dbConnect()
    const {word} = req.query
    if (!word || typeof word !== "string") {
            return res.status(400).json({
                error: "Search word invalid."
            });
    }

    try {
        const sets = await SetModel.find({
        $or:
        [ 
            {
                "title": {
                $regex: `${word}`, 
                $options: 'i'
                }
            },

            {
                "description": {
                $regex: `${word}`, 
                $options: 'i'
                }
            }
        ]
        }).populate("user", "username")

        return res.json(sets)
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server error" })
    }      
}