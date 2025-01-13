const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
app.get("/",(req,res)=>{
    res.send("HI");
})
module.exports=app;
