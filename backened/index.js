const express = require("express");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const chatRoute = require("./routes/chat");
const messageRoute = require("./routes/message");
const app = express();
const cors = require ("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const http = require("http");
const {Server} = require("socket.io");
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(bodyParser.json());


app.use("/user",userRoute);
app.use("/auth",authRoute);
app.use("/user/chat",chatRoute);
app.use("/user/chat/message",messageRoute);

server.listen(8080,()=>{
    console.log("server balle valle has been started now");
})

const io = new Server(server,{
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },

});

io.on("connection",(socket)=>{
    console.log("connected to socket");

    socket.on("join_room",(room)=>{
        socket.join(room);
    });

    socket.on("send-message",(data)=>{
        console.log(data.message);
        socket.to(data.user_id).emit("receive-message",data.message);
    });
});