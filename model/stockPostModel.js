const mongoose = require("mongoose")

const stockPostSchema = mongoose.Schema({
    username : { type : String, required : true },
    userId : { type : String, required : true },
    stockSymbol : { type : String, required : true },
    title : { type : String, required : true },
    description : { type : String, required : true },
    tags : { type : Array },
    // createdDate : { type : Date, required : true }
},{
    versionKey : false,
    timestamps : true 
})

const StockPostModel = mongoose.model('stockPost',stockPostSchema) ;    // collectionName , schemaName

module.exports = StockPostModel