require('dotenv').config(); // this import dot env and call the config load envirment variable from .env file stroe senstive info.
const express = require('express'); //This imports the Express package.
const mongoose = require('mongoose'); //This imports the mongoose ,an Object-Document Mapping (ODM) library that simplifies interacting with MongoDB
const bodyParser = require('body-parser'); //This imports body-parser, a middleware used to parse incoming request bodies (such as JSON or URL-encoded data)

const app = express(); //This creates an Express application. app is now your Express app that you can configure to handle routes, middleware, and start the server
const PORT = process.env.PORT || 5000; //This we get server DB uRL and POrt it check if port else run port on 5000.

app.use(bodyParser.json()); // This we prasing app body req into json

mongoose.connect(process.env.MONGO_URI, { useNewURLParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB')) //If connected with DB this message
    .catch((error) => console.error('❌ Connection error:', error)); // If not connected then this message/

//Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
//Server runing
app.listen(PORT, () => {
    console.log('🚀 Server running on port ${PORT}');
});