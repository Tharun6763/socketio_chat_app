import "./App.css"
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket=io.connect("http://localhost:8080")


export const App = () => {
    const [message,setMessage]=useState("");
    const [rcvmessage,setRcvmessage]=useState("")

    const handleChange=(e)=>{
        setMessage(e.target.value);
    }
    const sendMessage=(event)=>{
        console.log(message);
        socket.emit("send_message",{message:message})
    };

    useEffect(()=>{
      socket.on("recive_mesg", (data) => {
        console.log(`recived message ${data}`);
        setRcvmessage(data.message);
      });
    },[socket])
    
  return (
    <div>
        <input placeholder="Message.." type="text" value={message} onChange={handleChange}/ >
        <button onClick={sendMessage}>Send Request </button>
        {/* <h1>{rcvmessage}</h1> */}
        {rcvmessage}
    </div>
  )
}
