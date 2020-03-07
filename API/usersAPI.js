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
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){console.log(err)};
            newUser.password = hash;
            newUser.save(callBack);
        })
    })
}

module.exports.deleteUser = (user, callBack) =>{
    User.deleteOne({_id: user._id}).then(callBack(null, true));
}

module.exports.updateUser = (user, changes, callBack) =>{
    Object.keys(changes).forEach((tochange)=>{
        if(user[tochange] && changes[tochange] != ""){
            user[tochange] = changes[tochange]
            user.save(callBack)
        }
    })
}

//Auth Functions
module.exports.comparePassword = function (candidatePassword, hash, callBack){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err){ throw err};
        callBack(null, isMatch);
    })
}

module.exports.passport = function(passport){
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