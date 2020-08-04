const express = require('express')
const router = express.Router()
const User = require('../models/user')

const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/data"

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true}, err => {
    if (err)
        console.error(err)
    else
        console.log('Successfully connected to mongoDB')
})

router.get('/', (req, res) => {
    res.send('From API route.')
})

router.post('/register', (req, res) => {
    const userData = req.body;
    const user = new User(userData);
    user.save((error, registeredUser) => {
        if (error)
            console.log(error)
        else
        {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', (req, res) => {
    const userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if (error)
            console.log(error)
        else
        {
            if (!user) {
                res.status(401).send('Invalid email')
            }
            else {
                if (user.password !== req.body.password)
                    res.status(401).send('Invalid password')
                else
                    res.status(200).send(user)
            }
        }
    })
})

module.exports = router;