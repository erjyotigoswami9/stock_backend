const env = require("dotenv").config()
const jwt = require("jsonwebtoken")
const UserModel = require("../model/userModel")

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]  // Bearer token , so split is used to get token correctly
        jwt.verify(token, JWT_SECRET_KEY, async(err,decoded)=>{
            if(err){
                console.log(err)
                res.status(404).send({"success":false, "message": "error occurred while verifying token, maybe Invalid token!"})
            }
            else{
                req.user = { userId : decoded.userId , email: decoded.email, bio : decoded.bio, username: decoded.username, profilePicture: decoded.profilePicture }
                next()
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({"success":false, "message": "error occurred!"})
    }
}

module.exports = auth