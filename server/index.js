const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./route/route');
const messageRoute = require('./route/messageRoute');
const socket = require('socket.io')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',route);
app.use('/api/messages',messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>console.log("database connection successfully")).catch((err)=>console.log(err));


const server = app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("error while createing server1");
    }
    console.log(`server created successfully on ${process.env.PORT}`);
})

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credential:true
    }
})

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        }
    })
})