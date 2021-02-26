const router = require('express').Router();
const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');




//Registration
router.post('/register', async (req,res)=>{

    //validate the data before we a user
    const{error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    //create new user
    const user  =  new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date
    })
    //.then(()=> user.save())
    //.catch(error=>{res.send(error.details[0].message)})

    //catch the error
    /*functionDB()
    .then(()=>{
        console.log(user.save());
    })
    .catch(error=>{
        res.send(error.details[0].message);
    });*/

    try{
        const savedUser =  await user.save();
        //console.res.send(savedUser);
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err.message);
        //res.json({message: JSON.stringify(err.message)});
    }
});

//Login
router.post('/login', async (req,res)=>{
    //validate data before we create a user
    const{error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the email exist
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong')
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth_token',token).send(token);


    res.send('Logged in');
});



module.exports = router;