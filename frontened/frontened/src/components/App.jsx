import React from "react";
// import CreateChat from "../pages/CreateChat";
import {Route,Routes} from "react-router-dom";
import Login from "../pages/Login";
import Chat from "./Chat";
import chatProvider from "../context/chatProvider";

function App(){
    return(
        <chatProvider>
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>









            {/* {notes.map((note)=>{
                return(<Note
                key={note.key}
                title={note.title} desc={note.content} />)})
            } */}
            
        </div>
        </chatProvider>
    )
}

export default App;