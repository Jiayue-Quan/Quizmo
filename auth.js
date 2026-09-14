require('dotenv').config()
const UserModel = require('./models/User')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.headers.authorization
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
}

const userExtractor = async (req, res, next) => {
    const token = getTokenFrom(req)
    if (!token) {
        return null
    }
    try {
    const decodedToken = jwt.verify(
        token, 
        process.env.SECRET
    )
    
    const user = await UserModel.findOne({username: decodedToken.username})
    return user
    }
    catch (err) {
        console.log("Authentication failed:", err)
        return null
    }
}

module.exports = {
    userExtractor
}