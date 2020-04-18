//Node Modules
const mongoose = require("mongoose");

//Collection Init
const userSchema = mongoose.Schema({
    name:{type: String},
    email:{type: String},
    username:{type: String},
    password:{type: String},
});

module.exports = mongoose.model("User", userSchema);
