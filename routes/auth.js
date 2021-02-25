const router = require('express').Router();
const User = require('../model/User.js');



router.post('/register', async(req,res)=>{
    //res.send("register");
    const user  = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: req.body.date
    });
    try{
        const savedUser = await user.save();
        //console.res.send(savedUser);
        res.json(savedUser);
    }catch(err){
        //res.status(400).send(err);
        //res.status(400).send(err);
        res.json({message: err});
    }
});




module.exports = router;