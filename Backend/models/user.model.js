const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userSchema=mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:3
        },
        lastName:{
            type:String,
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be at least 5 characters long.']
    },
    password:{
        type:String,
        select:false,
        required:true
    },
    socketId:{
        type:String,
    }
})
userSchema.methods.generateToken=function (){
    const token=jwt.sign({_id:this._id},process.env.JWT_KEY,{expiresIn:"24h"});
    return token;
}
userSchema.methods.verifyPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.statics.hashPass=async(password)=>{
    return await bcrypt.hash(password,10);
}
module.exports=mongoose.model("User",userSchema);
