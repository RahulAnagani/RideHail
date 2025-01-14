const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const CapSchema=mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:3
        },
        lastName:{
            type:String,
            minlength:3
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['available','unavailable'],
        default:"unavailable",
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:3
        },
        plate:{
            type:String,
            required:true,
            minlength:5
        },
        capacity:{
            type:Number,
            required:true,
            min:1
        },
        type:{
            type:String,
            enum:["Bike","Auto","Car"],
            required:true,
        }
    },
    location:{
        lat:{
            type:Number,
        },
        long:{
            type:Number,
        }
    }

});
CapSchema.methods.generateToken=()=>{
    return jwt.sign({_id:this._id},process.env.JWT_KEY,{expiresIn:"24h"});
}
CapSchema.methods.verifyPass=async function(password) {
    return await bcrypt.compare(this.password,password);
}
CapSchema.statics.hashPass=async(password)=>{
    return await bcrypt.hash(password,10);
}
module.exports=mongoose.model("Captain",CapSchema);