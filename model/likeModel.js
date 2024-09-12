const mongoose = require("mongoose")

const likeSchema = mongoose.Schema({
    userId : { type : String, required : true },
    username : { type : String, required : true },
    postId : { type : String, required : true }
},{
    versionKey : false
})

const LikeModel = mongoose.model('like',likeSchema) 

module.exports = LikeModel