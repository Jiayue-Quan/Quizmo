require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const UserModel = require('./models/User')
const SetModel = require('./models/Set')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userExtractor = require('./middleware').userExtractor
const tokenExtractor = require('./middleware').tokenExtractor

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(tokenExtractor)

mongoose.connect(process.env.MONGODB_URI)


//process signup request
app.post('/signup', (req, res) => {
    const {email, password, user} = req.body
    //create new user w/ hashed password, save in database
    bcrypt.hash(password, 10).then(hash => {
        UserModel.create({email, password: hash, username: user})
        .then(users => res.json(users))
        .catch(err => {
            
            if (err instanceof mongoose.Error.ValidationError)
            {res.status(403).json("Duplicate Username")}
            else {
                res.json(err)
            }
            
        })
    }).catch(err => console.log(err.message))
    
})
//process login requets
app.post('/login', (req, res) => {
    const {email, password}  = req.body
    //find user w/ email
    UserModel.findOne({email: email})
    .then(user => {
        
        //confirm correct password
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (response) {
                    
                    //create/send token and user in response
                    const userForToken = {
                        email: email,
                        password: password,
                        username: user.username
                    }

                    const token = jwt.sign(
                        userForToken,
                        process.env.SECRET
                    )   
                    res.status(200).send({token, username: user.username, email: email})
            
            }
                else{res.status(401).json("Incorrect password")}
            })
            
        }
        else {
            return res.status(401).json("Invalid user")
        }
    })
})
//get all users
app.get('/users', (req, res) => {
    UserModel.find({}).then(users => res.json(users))
    .catch(err => console.log(err))
})
//get all sets
app.get('/searchSets/:word', (req, res) => {
    
    SetModel.find({
        $or:
        [ 
            {"title": {$regex: `${req.params.word}`, $options: 'i'}},
            {"description": {$regex: `${req.params.word}`, $options: 'i'}}
        ]
        }).then(sets => {
        
        res.json(sets)
    })
    .catch(err => console.log(err))
})
//add new set
    app.post('/sets', userExtractor, (req, res) => {
    const {title, description, cards, username} = req.body
    
        //create new set in database
        SetModel.create({
            title: title,
            description: description,
            cards: cards,
            //add creator's id to set properties
            user: req.user.id
    
        })
        .then(set => {
            //add set to the creator's list of sets
            UserModel.updateOne({username: req.user.username}, {$push: {sets: set.id}}).then(user => {return}).catch(err => console.log(err))
            res.json(set)
        
        })
        .catch(err => console.log(err))  
})
//get all user's sets
app.get('/sets', userExtractor, (req, res) => {
    
    UserModel.findOne({username: req.user.username}).then(user => {
        
        SetModel.find({user: user.id}).then(sets => {
            
            res.json(sets)
        })
        .catch(err => console.log(err))
    })
    
})
//get specific set
app.get('/sets/:setId', userExtractor, (req, res) => {
    UserModel.findOne({username: req.user.username}).then(user => {
        
        SetModel.findById(req.params.setId).then(set => {
            
            res.json(set)
        })
        .catch(err => console.log(err))
    })
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})