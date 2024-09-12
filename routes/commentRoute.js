const express = require("express")
const auth = require("../middleware/auth")
const CommentModel = require("../model/commentModel")
const StockPostModel = require("../model/stockPostModel")

const commentRouter = express.Router()

commentRouter.post('/:postId/comments', auth, async(req,res)=>{
    try {
        let {postId} = req.params
        let comment = req.body.comment 
        // console.log({postId, comment})
        let postData = await StockPostModel.findOne({_id:postId})
        if(postData!=null){
            let data = new CommentModel({postId, comment, userId:req.user.userId, username:req.user.username})
            await data.save()
            // console.log(data)
            res.status(200).send({success:true, message:"Comment added successfully", commentId:data._id})
        }
        else{
            res.status(404).send({success:false, message:"Post no longer exists for commenting1"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false, message:"error occurred!"})
    }
})

commentRouter.delete('/:postId/comments/:commentId', auth, async(req,res)=>{
    try {
        let {postId, commentId} = req.params
        // console.log({postId, commentId})
        let postData = await StockPostModel.findOne({_id:postId})
        // console.log(postData)
        if(postData!=null){
            let commentData = await CommentModel.findOne({_id:commentId})
            // console.log(commentData)
            if(commentData!=null){
                if(req.user.userId==commentData.userId || postData.userId==req.user.userId){
                    let data = await CommentModel.findByIdAndDelete({_id:commentData._id})
                    res.status(200).send({success:true, message:"Comment deleted successfully"})
                }
                else{
                    res.status(404).send({success:false, message:"comment creator's userId not matches with provided userId of either post creator or comment creator, you are not authorized to delete someone else comment"})    
                }
            }
            else{
                res.status(404).send({success:false, message:"commentId no longer exists in db"})
            }
        }
        else{
            res.status(404).send({success:false, message:"Post no longer exists for commenting1"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false, message:"error occurred!"})
    }
})

module.exports = commentRouter