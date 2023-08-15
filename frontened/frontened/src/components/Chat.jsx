import React,{useEffect, useState} from "react";
import io from "socket.io-client";
import axios from "axios";
import ChatBlock from "./ChatBlock";
// import { ChatState } from "../context/chatProvider";

const id = localStorage.getItem("userid");
var socket = io.connect("http://localhost:8080");
// let chatid="64d67c907988157603af1b18";

function Chat(){



  // const a = ChatState();
  // console.log("this is the userid",a.user_id);
  const [msg,setMsg] = useState("");
  const [roomid,setroomid] = useState("");
  const [name,setName] = useState("dummyuser");
  const [position,setPosition] = useState("");
  const [chats,setChat] = useState([{name: "",message: ""},]);
  const [chatstate,setChatstate] = useState([{
    mentor:{
      name:""
    },
    mentee:{
      name:""
    },
    _id:"",
  }]);
  const [chatid,setChatid] = useState("");

  const update=(e)=>{
    setroomid(e.target.value);
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    
    setroomid("");
  }



  // it take corresponding user detail and send it to the backened to get the name...........................................................
  axios.get(`http://localhost:8080/user/chat?id=${id}`)
       .then((res)=> res.data)
       .then((data)=> {
        setName(data.name);
        setChatstate(data.chatsData);
        setPosition(data.position)})
       .catch((err)=> console.log("the error in the chat.jsx page in name get request is that ",err));



  
  const selectedChat=(d)=>{
      setChatid(d);
      socket.emit("join room",{room: chatid});
      axios.get(`http://localhost:8080/user/chatfm?id=${chatid}`)
       .then((res)=> (res.data))
       .then((data)=> {
        let c=[];
        for (let i = 0; i < data.length; i++) {
          
          c.push({name: data[i].sender.name, message: data[i].content});
          console.log(c);
        }
        setChat(c);
       })
       .catch((err)=> console.log("the error in the chat.jsx page in fetch message get request is that ",err));
  }











  
  // it fetch all the previous chat from the backened and add in to the frontened............................................................
  




  //send message to the backened to store into the database................................................................................
  const sendchat=()=>{
    const c = [...chats];
    c.push({name: name,message: msg});
    socket.emit("send-message",{message : msg,room: chatid});
    setChat(c);
    axios.post(`http://localhost:8080/user/chat/message`,{
      sender: id,
      content: msg,
      chat: chatid,
    }).then((res)=> {
      if (res.status===200){
        console.log("message saved successfully");

      }
      else{
        console.log("message not saved in the database");
      }
    }).catch((err)=> console.log("the error in the chat.jsx page in name get request is that ",err));
  }
  useEffect(()=>{
    socket.on("receive-message",(data)=>{
      console.log(data);
      const c = [...chats];
      c.push({name: "user1",message: data});
      setChat(c);
      axios.get(`http://localhost:8080/user/chatfm?id=${chatid}`)
       .then((res)=> (res.data))
       .then((data)=> {
        let c=[];
        for (let i = 0; i < data.length; i++) {
          
          c.push({name: data[i].sender.name, message: data[i].content});
          console.log(c);
        }
        setChat(c);
       })
       .catch((err)=> console.log("the error in the chat.jsx page in fetch message get request is that ",err));
    })
  },[socket])











  return (<div className="head">
    <div className="side-chat-area">
      <div className="left-top-header">
        <h1>CHATS</h1>
      </div>
      <div className="chatlist">
        {chatstate.map((chatcard)=>{
          return(<ChatBlock
            ChatName={position==="Mentee"?chatcard.mentor.name:chatcard.mentee.name}
            onAdd={selectedChat}
            chatdetails={chatcard._id}
          />);
        })}
      </div>
    </div>
  <div className="main-chat-area">
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
        <input type="text" onInput={e=>setMsg(e.target.value)} placehoder="enter your chat"></input>
        <button onClick={e=>sendchat()}>send</button>
      </div>
      
   </div>
  </div>

  )} ; 
export  default Chat;