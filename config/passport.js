//Node Modules
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

//Custom Modules
const usersAPI = require("../API/usersAPI")


module.exports = function(passport){
    let = opt = {};
    opt.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opt.secretOrKey = process.env.PASS_SECRET;
    passport.use(new JwtStrategy(opt, (jwt_payload, done) => {
        usersAPI.getUserById(jwt_payload._id, (err, user) => {
            if(err){return done(err, false)}
            if(user){return done( null, user)}
            else{return done(null, false)}
        })
    }))
}