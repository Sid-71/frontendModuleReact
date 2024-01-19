import React, { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from "react-router-dom";
const LoginForm = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    let url = "http://localhost:5000/user"
    const userData = await axios.get(url);

    let userFound = false;
    userData.data.map((d)=>{
       if(d.id === email && d.password === password){
        userFound = true;
       }
    })
  if(!userFound)
  {
    alert("Not a authorised user");
    setEmail('');
    setPassword('');
  }
  else {
    console.log("login succesful");
    localStorage.setItem('email',email);
    navigate('/');
  }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: 'auto',
        marginTop: '100px', // Adjust this value to control the vertical centering
      }}
    >
      <div  style={{ marginBottom: '10px' }}>
        <label>Email:</label>
        <input
        className=' border-zinc-800 border-2 '
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div 
    
      style={{ marginBottom: '10px' }}>
        <label>Password:</label>
        <input
          className=' border-zinc-800 border-2 '
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: '#00d2ff',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
