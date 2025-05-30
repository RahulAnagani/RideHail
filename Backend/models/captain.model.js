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
        minlength:4,
        select:false
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
        ltd:{
            type:Number,
        },
        lng:{
            type:Number,
        }
    }

});
CapSchema.methods.generateToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_KEY,{expiresIn:"24h"});
}
CapSchema.methods.verifyPass=async function(password) {
    return await bcrypt.compare(password,this.password);
}
CapSchema.statics.hashPass=async(password)=>{
    return await bcrypt.hash(password,10);
}
module.exports=mongoose.model("Captain",CapSchema);
