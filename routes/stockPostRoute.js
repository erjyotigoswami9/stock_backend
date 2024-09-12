const express = require("express")
const StockPostModel = require("../model/stockPostModel")
const CommentModel = require("../model/commentModel")
const LikeModel = require("../model/likeModel")
const auth = require("../middleware/auth")

const stockPostRouter = express.Router()

stockPostRouter.post('/', auth, async(req,res)=>{
    try {
        let { stockSymbol , title, description, tags } = req.body 
        let data = new StockPostModel({stockSymbol, title, description, tags, userId : req.user.userId, username : req.user.username}) 
        await data.save()
        console.log(data)
        res.status(200).send({success : true, postId : data._id , message : "Post created successfully"})
    } catch (error) {
        console.log(error)
        res.status(404).send({success: false, message : "error occurred !", userId : req.user.userId})
    }
})

stockPostRouter.get('/', async(req,res)=>{
    try {
        let stockSymbol = req.query.stockSymbol || ""
        let tags = req.query.tags || ""
        let sortByDate = req.query.date || ""
        let limit = req.query.limit || 10
        let page = req.query.page || 1
        let data = []
        if(stockSymbol!="" && tags!="" && sortByDate!=""){
             data = await StockPostModel.aggregate({ $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate: { $substr: ["$createdAt", 0, 10] } } }, { $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate:1, dt : {$eq: ["$creationDate",sortByDate] }, stockSymbolCheck:{$eq:["$stockSymbol",stockSymbol]}, tagsCheck : {$in:[tags,"$tags"]} } },{$skip:(page-1)*limit},{$limit:limit})
             data = data?.filter(ele=>ele.tagsCheck==true && ele.stockSymbolCheck==true && ele.dt==true)
        }
        else if(stockSymbol!="" && sortByDate!=""){
             data = await StockPostModel.aggregate({ $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate: { $substr: ["$createdAt", 0, 10] } } }, { $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate:1, dt : {$eq: ["$creationDate",sortByDate] }, stockSymbolCheck:{$eq:["$stockSymbol",stockSymbol]} } },{$skip:(page-1)*limit},{$limit:limit})
             data = data?.filter(ele=>ele.stockSymbolCheck==true && ele.dt==true)
        }
        else if(stockSymbol!="" && tags!=""){
             data = await StockPostModel.find({stockSymbol:{$eq:stockSymbol},tags:{$in: [tags]}}).skip((page-1)*limit).limit(limit)
        }
        else if(tags!="" && sortByDate!=""){
             data = await StockPostModel.aggregate({ $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate: { $substr: ["$createdAt", 0, 10] } } }, { $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate:1, stockSymbolCheck:{$eq:["$stockSymbol",stockSymbol]}, tagsCheck : {$in:[tags,"$tags"]} } },{$skip:(page-1)*limit},{$limit:limit})
             data = data?.filter(ele=>ele.tagsCheck==true && ele.dt==true)
        }
        else if(stockSymbol!=""){
             data = await StockPostModel.find(({stockSymbol:{$eq:stockSymbol}})).skip((page-1)*limit).limit(limit)
        }
        else if(tags!=""){
             data = await StockPostModel.find({tags:{$in: [tags]}}).skip((page-1)*limit).limit(limit)
        }
        else if(sortByDate!=""){
             data = await StockPostModel.aggregate({ $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate: { $substr: ["$createdAt", 0, 10] } } }, { $project: { _id: 1, userId: 1, stockSymbol: 1, title: 1, description: 1, tags: 1, creationDate:1, dt : {$eq: ["$creationDate",sortByDate] } } },{$skip:(page-1)*limit},{$limit:limit})
             data = data?.filter(ele=>ele.dt==true)
        }
        else if(tags=="" && stockSymbol=="" && sortByDate==""){
             data = await StockPostModel.find().skip((page-1)*limit).limit(limit)
        }
        let changeData = []
        for (let i=0;i<data.length;i++){
            let e = data[i]._id 
            let {_id, stockSymbol, title, description, createdAt, tags} = data[i]._doc
            let dataLike2 = await LikeModel.find({postId:e})
            let countLike2 = dataLike2.length
            console.log({ postId:_id, stockSymbol, title, description, createdAt,likesCount : countLike2})
            changeData.push({postId:_id, stockSymbol, title, description, tags, createdAt:createdAt.toString().slice(0,10),likesCount : countLike2})  
        }
        // console.log(changeData)
        res.status(200).send([...changeData])
    } catch (error) {
        console.log(error)
        res.status(404).send({success: false, message : "error occurred !"})
    }
})

stockPostRouter.get('/:postId', async(req,res)=>{
    try {
        let postId = req.params.postId 
        let dataStock1 = await StockPostModel.findOne({_id : postId})
        if (dataStock1!=null) {
            let dataComment1 = await CommentModel.find({postId : postId }) 
            let commentCount = dataComment1.length
            let dataLike1 = await LikeModel.find({postId})
            let likeCount = dataLike1.length
            res.status(200).send({postId, stockSymbol:dataStock1.stockSymbol, title: dataStock1.title, description:dataStock1.description,likesCount: likeCount, comments : dataComment1})
        }
        else {
            res.status(404).send({success:false,message:"postId not exist in the db"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success: false, message : "error occurred !"})
    }
})

stockPostRouter.delete("/:postId", auth, async(req,res)=>{
    try {
        let postId = req.params.postId 
        let dataCheck = await StockPostModel.findOne({_id:postId})
        if(dataCheck!=null){
            if(dataCheck.userId==req.user.userId){
                let data = await StockPostModel.findByIdAndDelete({_id: postId})
                console.log(data)
                res.status(200).send({success:true, message:"Post deleted successfully"})
            }
            else{
                res.status(404).send({success:false, message:"userId not match with the post creator's userId, you are not eligible to delete someone else post!"})
            }
        }
        else{
            res.status(404).send({success:false, message:"postId no more exists in db"})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({success: false, message : "error occurred !"})
    }
})

module.exports = stockPostRouter