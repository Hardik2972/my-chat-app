import React from "react";

const ChatBlock=(props)=>{

  const setid = (e)=>{
    e.preventDefault();
    props.onAdd(props.chatdetails);
  }


    return(
        <div className="block" onClick={setid}>
          <div className="imgbx">
            <img className="cover"></img>
          </div>
          <div className="details">
            <div class="listHead">
              <h4>{props.ChatName}</h4>
            </div>
            <div className="message_p">
              <p>{props.latest_message}</p>
            </div>
          </div>

        </div>
    )
}

export default ChatBlock;