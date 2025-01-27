const {Server}=require("socket.io");
const userModel=require("./models/user.model");
const capModel=require("./models/captain.model");
let io;
module.exports.initializeSocket=(server)=>{
    io=new Server(server,{cors:{
        origin:'*',
        methods: ["GET", "POST"]
    }});
    io.on("connection",(socket)=>{
        console.log(`An user with a socket id : ${socket.id} is connected`);
        socket.on("join",async(data)=>{
            const {userId,userType}=data;
            if(userType==='USER'){
                try{
                    const user=await userModel.findByIdAndUpdate(userId,{socketId:socket.id});
                }
                catch(e){
                    console.log(e);
                }
            }
            else if(userType==='CAPTAIN'){
                try{
                    const cap=await capModel.findByIdAndUpdate(userId,{socketId:socket.id});
                }
                catch(e){
                    console.log(e);
                }
            }
        });
        socket.on("update-captain-location",async(data)=>{
            if(!data.coords?.lng||!data.coords?.ltd){
                socket.emit('error',"no coords found");
            }
            else{
                try{
                    const cap=await capModel.findByIdAndUpdate(data.userId,{location:{ltd:data.coords.ltd,lng:data.coords.lng}});
                }
                catch(e){
                    console.log(e);
                }
            }
        })
    })
}
module.exports.sendMessage=async(socketId,Ride,event)=>{
    if(io){
        io.to(socketId).emit(event,Ride);   
    }
    else{
        console.log("Socket ain;t initialized :(");
    }
}