const captainModel=require("../models/captain.model");
module.exports.createCaptain=async({fullName,password,email,vehicle})=>{
    try{
        const cap=await captainModel.create({
            fullName,
            email,
            password,
            vehicle
        });
        if(cap){
            return {status:true,captain:cap};
        }
        else{
            return {status:false};
        }
    }
    catch(e){
        return {status:false,e}
    }
    return {status:false};
}