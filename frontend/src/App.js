import React, { useState, useEffect } from "react";
import io from 'socket.io-client'
import "./App.css"


const socket = io('http://localhost:7000')
const userName = 'User '+parseInt(Math.random() * 10) + 1;
function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', payload => {
      let chatRef = chat;
      chatRef.push(payload);
      setChat([...chatRef])
    })
  },[])

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message',{userName,message})
    setMessage('')
  };
  return (
    <div className="App">
      <h1>Chat App</h1>
      <form  onSubmit={sendMessage}>
        <div className="row">
          <input type="text" name="message"
          placeholder='Texting..'
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          required
          ></input>
          <button type='submit'>Send</button>
        </div>
      </form>
      {chat.map((payload, index)=>{
        return(
          <h3 key={index}>{payload.userName}: <span>{payload.message}</span></h3>
        )
      })}
    </div>
  );
}

export default App;
