import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import './AdminLogin.css';

function Main(){
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick2 = () =>{
    navigate('/User');
  }
  return (
    <div className='container'>
      <div className='container-box'>
      <h1>Login Here!</h1>
      <label for="name">Username</label>
      <input  type="text" placeholder="Type your username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <br>
      </br>
      <br>
      </br>
      <label for="name">Password</label>
      <input type='text' placeholder='Type your password' value={password} onChange={(e) => setPassword(e.target.value)} ></input>
      <br>
      </br>
      <br>
      </br>
      <button onClick={handleClick2}>Login</button>
      </div>
    </div>
  );
}

export default Main