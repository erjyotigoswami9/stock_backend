const express = require("express")

const connection = require("./config/db")
const userRouter = require("./routes/userRoute")
const stockPostRouter = require("./routes/stockPostRoute")
const commentRouter = require("./routes/commentRoute")
const likeRouter = require("./routes/likeRoute")

const env = require("dotenv").config()
const PORT = process.env.PORT

const server = express()
server.use(express.json())
server.use('/api',userRouter)
server.use('/api/posts', stockPostRouter) 
server.use('/api/posts',commentRouter)
server.use("/api/posts",likeRouter)

server.get('/', (req,res)=>{
    try {
        res.status(200).send({"message":"health checkup is fine"})
    } catch (error) {
        console.log(error)
        res.status(404).send({"success":false, "message": "error occurred!"})
    }
})

server.listen(PORT, async ()=>{
    try {
        await connection  
        console.log(`server is running at port ${PORT} and db is connected`)
    } catch (error) {
        console.log(error)
    }
})