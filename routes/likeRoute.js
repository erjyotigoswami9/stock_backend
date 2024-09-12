const express = require("express")
const auth = require("../middleware/auth")
const LikeModel = require("../model/likeModel")
const StockPostModel = require("../model/stockPostModel")

const likeRouter = express.Router()

likeRouter.post('/:postId/like', auth, async(req,res)=>{
    try {
        let {postId} = req.params
        let postData = await StockPostModel.findOne({_id:postId})
        if(postData!=null){
            let likePostData = await LikeModel.findOne({userId:req.user.userId, postId: postId}) 
            if(likePostData!=null){
                res.status(404).send({success:false, message:"post already liked by user"}) 
            }
            else{
               let data = new LikeModel({username:req.user.username, userId : req.user.userId, postId})
               await data.save()
               console.log(data)
               res.status(200).send({success:true, message:"Post liked"})
            }
        }
        else{
            res.status(404).send({success:false, message:"postId/post no longer exists for liking!"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false, message:"error occurred!"})
    }
})

likeRouter.delete('/:postId/like', auth, async(req,res)=>{
    try {
        let {postId} = req.params
        let userId = req.user.userId 
        let likeDataCheck = await LikeModel.findOne({userId, postId}) 
        if(likeDataCheck!=null){
            let data = await LikeModel.findByIdAndDelete({_id:likeDataCheck._id})
            console.log(data)
            res.status(200).send({success:true, message:"Post unliked"})
        }
        else{
            res.status(404).send({success:false, message:"Post is already unliked by the user!"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false, message:"error occurred!"})
    }
})

module.exports = likeRouter