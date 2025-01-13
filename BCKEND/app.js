const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const connect=require("./config/connect");
app.get("/",(req,res)=>{
    res.send("HI");
})
connect();
module.exports=app;
