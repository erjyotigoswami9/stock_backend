const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email : { type : String, required : true },
    password : { type : String, required : true },
    username : { type : String, required : true },
    bio : { type : String, required : true },
    profilePicture : { type : String , required : true}   // to store profile picture image link/url
},{
    versionKey : false
})

const UserModel = mongoose.model('user',userSchema)

module.exports = UserModel