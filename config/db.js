const env = require("dotenv").config()
const MONGO_URL = process.env.MONGO_URL
const mongoose = require("mongoose")

const connection = mongoose.connect(`${MONGO_URL}/AltDB`)

module.exports = connection