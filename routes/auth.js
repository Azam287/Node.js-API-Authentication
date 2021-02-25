const router = require('express').Router();
const User = require('../model/User.js');
const {registerValidation} = require('../validation');





router.post('/register', async (req,res)=>{

    //validate the data before we a user
    const{error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    //create new user
    const user  =  new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    });

    //catch the error
    /*functionDB()
    .then(()=>{
        console.log(user.save());
    })
    .catch(error=>{
        res.send(error.details[0].message);
    });*/
    try{
        const savedUser =  user.then.save();
        //console.res.send(savedUser);
        res.json(savedUser);
    }catch(err){
        res.status(400).send(err);
        //res.json({message: JSON.stringify(err.message)});
    }
});




module.exports = router;