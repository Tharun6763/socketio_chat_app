const express=require('express');
const cors=require('cors');
 const app=express();
const http=require("http")//socketio is built on the http server
const {Server}=require('socket.io') //Server is class

const server=http.createServer(app)
app.use(cors());
 
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})

io.on("connection",(socket)=>{
    console.log(`User  Connected:${socket.id}`);
    socket.on("send_message",(data)=>{
        socket.broadcast.emit("recive_mesg",{message:data});
    })
    // socket.emit("recive_mesg",{message:data})
    })


server.listen(8080,()=>{
    console.log("server is running in the port 8080")
})
