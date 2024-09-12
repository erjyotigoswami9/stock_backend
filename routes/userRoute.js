const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const env = require("dotenv").config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const UserModel = require("../model/userModel")
const auth = require("../middleware/auth")   // middleware to check valid token/user

const userRouter = express.Router()

userRouter.post('/auth/register', async(req,res)=>{
    try {
        let { username, email, password } = req.body 
        // console.log({username, email})
        let bio = "user details"
        let profilePicture = "https://cdn-icons-png.flaticon.com/128/12225/12225935.png"
        let dataPresent = await UserModel.findOne({email})
        if(dataPresent!=null){
            res.status(200).send({"success" : true , "message" : "User already registered", userId : dataPresent._id})
        }
        else {
            let pswd = await bcrypt.hash(password,3)  // password , salt rounds
            let data = new UserModel({username , email, password : pswd , bio : bio, profilePicture : profilePicture })
            await data.save()
            console.log(data)
            res.status(200).send({"success" : true , "message" : "User registered successfully", userId : data._id})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({"success":false, "message": "error occurred!"})
    }
})

userRouter.post('/auth/login' ,async(req,res)=>{
    try {
        let { email, password } = req.body 
        // console.log({email})
        let dataPresent = await UserModel.findOne({email})
        if(dataPresent!=null){
            bcrypt.compare(password, dataPresent.password, (err,result)=>{
                if(err){
                    console.log(err)
                    res.status(404).send({"success":false, "message": "error occurred while decrypting password!",userId: dataPresent._id })
                }
                else{
                    if(!result){
                        // if wrong password typed then result is not 1 , that's 0 
                        res.status(404).send({"success":false, "message": "Invalid credentials / wrong password!",userId: dataPresent._id })
                    }
                    else{
                        const token = jwt.sign({email:dataPresent.email, username : dataPresent.username, userId : dataPresent._id, bio : dataPresent.bio, profilePicture : dataPresent.profilePicture }, JWT_SECRET_KEY)
                        res.status(200).send({token,user:{ username: dataPresent.username, email: dataPresent.email, id: dataPresent._id}})
                    }
                }
            })
        }
        else{
            res.status(404).send({"success": false, "message": "User(email) not registered, kindly register first!", userId:"NA"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(404).send({"success":false, "message": "error occurred!"})
    }
})

userRouter.get('/user/profile/:userId', auth , async(req,res)=>{
    try {
        let userId = req.params.userId 
        console.log(userId)
        if(userId==req.user.userId){
            res.status(200).send({id:req.user.userId, username: req.user.username, bio: req.user.bio, profilePicture : req.user.profilePicture})
        }
        else {
            res.status(404).send({success:false, message: "req.params userId is not matching with the token extracting userId, please enter right matching credential!", userId:req.user.userId})
        }
    } catch (error) {
        console.log(error)
        res.status(404).send({"success":false, "message": "error occurred!"})
    }
})

userRouter.put('/user/profile', auth, async(req,res)=>{
    try {
        let dataSend = req.body 
        let data = await UserModel.findByIdAndUpdate({_id:req.user.userId},{...dataSend}) 
        res.status(200).send({success:true, message:'Profile updated'})
    } catch (error) {
        console.log(error)
        res.status(404).send({"success":false, "message": "error occurred!"})
    }
})



module.exports = userRouter