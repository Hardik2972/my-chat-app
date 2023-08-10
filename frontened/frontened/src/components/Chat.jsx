import React,{useEffect, useState} from "react";
import io from "socket.io-client";
import axios from "axios";
// import { ChatState } from "../context/chatProvider";

const id = "64d21fd7e4f68d07632962d1" ;
var socket = io.connect("http://localhost:8080");;

function Chat(){
  // const a = ChatState();
  // console.log("this is the userid",a.user_id);
 const [name,setName] = useState("dummyuser");
 const [chats,setChat] = useState([
    {name: "user1",message: "message"},
    {name: "dummyuser",message: "message2"}
]);
axios.get(`http://localhost:8080/user/chat?id=${id}`)
      .then((res)=> console.log(res.data))
      .catch((err)=> console.log("the error is",err));


  const [msg,setMsg] = useState("");
  // socket.emmit("join_room",room.id);
  const sendchat=()=>{
    const c = [...chats];
    c.push({name: name,message: msg});
    socket.emit("send-message",{message : msg});
    setChat(c);
  }
  useEffect(()=>{
    socket.on("receive-message",(data)=>{
      console.log(data);
      const c = [...chats];
      c.push({name: "user1",message: data});
      setChat(c);
    })
  },[socket])

  return (
  <div>
      <h1>User: {name}</h1>
      <div className="chat-container">
      {chats.map((c)=><div className={`chatchotucontainer ${c.name === name ? 'me':''}`}>
          <p className="chatbox">
            <strong>{c.name}: </strong>
            <span>{c.message}</span>
          </p>
      </div>)}
      </div>
      <div className="btm">
        <input type="text" onInput={e=>setMsg(e.target.value)} placehoder="enter your chat">
        </input>
        <button onClick={e=>sendchat()}>send</button>
      </div>
  </div>

  )} ; 
export  default Chat;