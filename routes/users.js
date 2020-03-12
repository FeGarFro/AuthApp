//Node Modules
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Custom Modules
const usersAPI = require("../API/usersAPI");//User API functions
const User = require("../models/user")//DB Collection - Mongoose Schema


// GET requests
router.get("/", async (req, res) =>{
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.json(err)
    }
})

router.get("/profile", passport.authenticate('jwt', {session: false} ), (req, res, next) => {
    res.json({user: req.user});
})

//POST requests
router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    usersAPI.addUser(newUser, (err, user) => {
        if(err){res.json({success: false, msg:"Failed to register new user", error: err})}
        else{
            res.json({success: true, msg: "User registered"})
        }
    })
})

router.post("/auth", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    usersAPI.getUserByUserName(username, (err, user) =>{
        if(err){return res.json({success: false, error: err})}
        if(!user){ return res.json({success: false, msg:"User not found"})}
        
        usersAPI.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){throw err}
            if(isMatch){
                const token = jwt.sign(user.toJSON(), process.env.PASS_SECRET, {
                    expiresIn: 604800 // 1 week
                })
                res.json({
                    success: true, 
                    token:"JWT " + token,
                    user:{
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                    msg: "Logged in"
                })
            }
            else{res.json({success: false, msg:"Wrong Password"})}
        })
    })
})

router.post("/profile/delete", passport.authenticate('jwt', {session: false} ), (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    usersAPI.getUserByUserName(username, (err, user) =>{
        if(err){return res.json({success: false, error: err})}
        if(!user){ return res.json({success: false, msg:"User not found"})}
        usersAPI.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){throw err}
            if(isMatch){

                usersAPI.deleteUser(user, (err, isDeleted) =>{
                    if(err){throw err}
                    if(isDeleted){
                        res.json({
                            success: true, 
                            user:{
                                id: user._id,
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                        })
                    }
                    else{res.json({success: false, msg:"Wrong Password"})}
                })

            }
            else{res.json({success: false, msg:"Wrong Password"})}   

        })
    })
})

router.post("/profile/update", passport.authenticate('jwt', {session: false} ), (req, res, next) => {
    const username = req.body.cred.username;
    const password = req.body.cred.password;
    const changes = req.body.changes;

    usersAPI.getUserByUserName(username, (err, user) =>{
        if(err){return res.json({success: false, error: err})}
        if(!user){ return res.json({success: false, msg:"User not found"})}
        usersAPI.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){throw err}
            if(isMatch){
                usersAPI.updateUser(user, changes, (err)=>{
                    if(err){res.json({success: false, error: err})}
                    res.json({success: true, msg:"User " + username + " updated to " + user.username})
                })
            }
            else{res.json({success: false, msg:"Wrong Password"})}
        })
    })
})


module.exports = router;