const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        minlength:[3,"Fullname must be at least 3 characters long."]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be at least 5 characters long.']
    },
    password:{
        select:false,
        type:String,
        required:true,
    },
    socketId:{
        type:String,
    }
})
