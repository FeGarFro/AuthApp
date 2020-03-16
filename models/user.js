//Node Modules
const mongoose = require("mongoose");

//Collection Init
const userSchema = mongoose.Schema({
    profilePic: {type: Image},
    name:{type: String},
    email:{type: String},
    username:{type: String},
    password:{type: String},
    doc: {type: String},
    phone:{type: String},
    tags: {type: Object},
    bookshelf: {type: Book}
});

const Book = {
    local_id: {type: Number},
    api_id: {type: String},
    title: {type: String},
    author: {type: String},
    thumbnail: {type: String},
    status: {type: String},
    history: {
        checkpoint:{
            date: {type: Date},
            page: {type: String}
        }
    }
}

module.exports = mongoose.model("User", userSchema);
