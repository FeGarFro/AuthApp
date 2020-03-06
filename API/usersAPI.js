//Node Modules
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

//Custom Modules
const User = require("../models/user");

//Search Functions
module.exports.getUserById = function(id, callBack){
    User.findById(id, callBack);
};

module.exports.getUserByUserName = function (username, callBack) {
    const query = {username: username}
    User.findOne(query, callBack);
};

//Change Functions
module.exports.addUser = function (newUser, callBack) {
    bcrypt.genSalt(10, (err, salt) => {
        console.log("adding User " + newUser.name + " salt " + salt);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){console.log(err)};
            console.log("Hashing password " + hash);
            newUser.password = hash;
            newUser.save(callBack);
        })
    })
}

//Auth Functions
module.exports.comparePassword = function (candidatePassword, hash, callBack){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err){ throw err};
        callBack(null, isMatch);
    })
}

module.exports = function(passport){
    let = opt = {};
    opt.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opt.secretOrKey = process.env.PASS_SECRET;
    passport.use(new JwtStrategy(opt, (jwt_payload, done) => {
        exports.getUserById(jwt_payload._id, (err, user) => {
            if(err){return done(err, false)}
            if(user){return done( null, user)}
            else{return done(null, false)}
        })
    }))
}