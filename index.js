const express = require('express');
const app = express();
const mongoose = require('mongoose');
//const dotenv = require('dotenv')
require('dotenv/config');

//Connect to database
mongoose.connect(process.env.DATABASE_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },()=>console.log("Database is connected"));

//import route
const authRouter  = require('./routes/auth.js');

//middleware
app.use('/api/user', authRouter);

//listening server
app.listen(3000,()=>console.log("server is running"));