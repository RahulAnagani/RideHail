const userModel=require("../models/user.model");
module.exports.registerUser=async(obj)=>{
    try{
        const user=await userModel.create({
            fullName:{
                firstName:obj.fullName.firstName,
                lastName:obj.fullName.lastName
            },
            email:obj.email,
            password:obj.hashPass
        });
        return {status:true,user};
    }
    catch(e){
        return {status:false,e}
    }
    return {status:false};
}