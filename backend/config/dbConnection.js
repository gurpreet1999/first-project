const mongoose=require("mongoose")


const databaseConnection=()=>{
    mongoose.connect(process.env.MONGO_URL).then((res)=>{
console.log("mongoDb is connected")
    })
}

module.exports=databaseConnection