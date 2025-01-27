const app=require("./app");
const http=require("http");
const { initializeSocket } = require("./socket");
const server=http.createServer(app);
initializeSocket(server);
server.listen(process.env.PORT,"0.0.0.0",()=>{
  console.log(`Server running on the PORT ${process.env.PORT}`);
})