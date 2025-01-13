const mongoose=require("mongoose");
const connect=async()=>{
    try{
        const connection=await mongoose.connect(process.env.URI);
        console.log("Connected to the database",connection.connection.host);
    }
    catch(e){
        console.log("Error connecting in the database",e);
    }
}
module.exports = connect;