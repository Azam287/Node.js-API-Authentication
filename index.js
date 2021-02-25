const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

app.use(bodyparser.json());

//import route
const authRoute  = require('./routes/auth.js');




require('dotenv/config');

//Connect to database
mongoose.connect(process.env.DATABASE_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>console.log("Database is connected"));

//Middleware
//app.use(express.json());


//Route middleware
app.use('/api/user', authRoute);



//listening server
app.listen(3000,()=>console.log("server is running"));