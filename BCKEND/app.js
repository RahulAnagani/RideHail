const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const connect=require("./config/connect");
const userRoutes=require("./routes/user.routes");
const cors=require("cors");
const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("/user",userRoutes);
app.get("/",(req,res)=>{
    res.send("HI");
})
connect();
module.exports=app;
