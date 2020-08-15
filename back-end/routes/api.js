const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
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
                {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token, user})
                }
            }
        }
    })
})

router.post('/save-todos', (req, res) => {
    const data = req.body;
    const userEmail = data.email;
    const listToSave = data.todos;
    User.findOne({email: userEmail}, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            user.todos = [...listToSave];
            user.save();
            res.status(200).send({user});
        }
    })
})

router.post('/get-todos', (req, res) => {
    const userEmail = req.body.email;

    User.findOne({email: userEmail}, (error, user) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(200).send({user});
        }
    })
})

module.exports = router;