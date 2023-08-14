const app = require("./app");
const cloudinary=require("cloudinary")
const databaseConnection = require("./config/dbConnection");



cloudinary.v2.config({
    cloud_name:"gurpreetcloud",
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


databaseConnection()

const server=app.listen(process.env.PORT,(req,res)=>{
console.log("server is running is fine")
})