const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")
const tempelatepath=path.join(__dirname,'../tempelates')
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.json())
app.set("view engine","hbs")
app.set("views",tempelatepath)
app.use(express.urlencoded({extended:false}))
app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.post("/signup",async(req,res)=>{
    const data={
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password
    }
    if(data.fullname&&data.password&&data.email)
    {
    try{
    await collection.insertMany([data])
    res.render("home")}
    catch(error)
    {
        res.status(500).send('Error saving data ${error}')
    }
    }
    else{
        res.status(400).send('Details cannot NULL')
        res.render("/signup")
    }
})
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({email:req.body.email})
        if(check.password===req.body.password)
        {
            res.render("home")
        }
        else{
            res.send("wrong password")
        }
    }
    catch{
        res.send("Wrong detail")
    }
})
app.listen(3000,()=>{
    console.log("port connected");
})
