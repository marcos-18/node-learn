const express = require('express'); //This imports the Express package.
const User = require('../models/User'); //This imports user table schema from model.
const bcrypt = require('bcrypt'); // This library for using passwrd into hash.
const router = express.Router(); // This we get express router to handle multple req.

//API to insert new user
router.post('/add', async(req, res) => {
    try {
        // console.log(req.body);
        const { name, password, email } = req.body; // THis destructuring from body emai, pass, etc.
        const existingUser = await User.findOne({ email }); // This check email exist or ot?
        if (existingUser) {
            return res.json({ error: 'Email already exist', status: 400 }); // if email exist then return req from here
        }

        hashedPassword = await bcrypt.hash(password, 10); // this to genrate hash psw

        //create new user
        const newUser = new User({ name, password: hashedPassword, email }); // creating new user
        // const newUser = new User({ name, password, email });
        await newUser.save(); //saveing  into table
        res.json({ status: 201, message: 'User added successfully', user: newUser }); //succes message
    } catch (error) {
        res.status(500).json({ status: 500, error: 'Internal Server Error' }); // if any other error
    }
});
module.exports = router; //This exports the router object so it can be used in other parts of the application