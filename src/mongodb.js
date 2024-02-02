const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/LoginTest")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect")
})
const LogInSchema=new mongoose.Schema({
    fullname:{
        type:String,
        require:true    
    },
    email:
    {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true    
    }
})
const collection=new mongoose.model("LoginCollection",LogInSchema)
module.exports=collection