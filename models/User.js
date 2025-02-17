const mongoose = require('mongoose'); // this import mongoDB to interact with Mongo DB

const userSchema = new mongoose.Schema({ // Here is Table schema of tbale
    name: { type: String, required: true },
    password: { type: String, required: true }, // Fixed data type
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    }
});

const User = mongoose.model('User', userSchema); // this create model of user
module.exports = User; // we can use user to perform any action (CRUD) in User collection/