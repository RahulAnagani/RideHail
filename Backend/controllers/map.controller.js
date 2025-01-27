const {getAddressCoordinates,getDistance, getSuggestions} = require("../services/maps.services");
const {validationResult}=require("express-validator")
module.exports.getAddressCoordinates=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
       return  res.status(400).json({status:false});
    }
    const {address}=req.query;
    try{
        const coordinates=await getAddressCoordinates(address);
       return res.status(200).json(coordinates);
    }
    catch(e){
       return  res.status(404).json({status:false,message:"Coordinates not found"});
    }

}
module.exports.getDistance=async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({status:false,errors:errors.array()});
   }
   const {origin,destination}=req.query;
   try{
      const dist=await getDistance(origin,destination);
      if(dist){
         return res.status(200).json(dist);
      }
      else{
         return res.status(404).json({status:false});
      }
   }
   catch(e){
      return res.status(500).json({status:false});
   }
}
module.exports.getSuggestions=async(req,res)=>{
   const errors=validationResult(req);
   const {input}=req.query;
   if(!errors.isEmpty())return res.status(400).json({status:false});
   const suggestions=await getSuggestions(input);
   // console.log(suggestions);
   if(!suggestions)return res.status(400).json({status:false});
   else return res.status(200).json({takeIt:suggestions.predictions});
}
