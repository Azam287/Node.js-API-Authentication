const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


//import route
const authRoute  = require('./routes/auth.js');

//Middleware
app.use(bodyparser.json());


require('dotenv/config');

//Connect to database
mongoose.connect(process.env.DATABASE_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err)=>{
        if(err) {
            console.log(err);
            return;
        }
        console.log("Database is connected");
    })

//Middleware
//app.use(express.json());


//Route middleware
app.use('/api/user', authRoute);



//listening server
app.listen(3000,()=>console.log("server is running"));