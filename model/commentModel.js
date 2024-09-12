const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    userId : { type : String, required : true },
    username : { type : String, required : true },
    postId : { type : String, required : true },
    comment : { type : String, required : true }
},{
    versionKey : false,
    timestamps : true 
})

const CommentModel = mongoose.model('comment',commentSchema) 

module.exports = CommentModel