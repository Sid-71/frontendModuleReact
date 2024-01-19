import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    let url = "http://localhost:5000/user"
    let body =  {
        username : username,
        id : email,
        password : password
    }

    
    const userData = await axios.get(url);
    let check = true;



    userData.data.map((d)=>{
        if(d.id === email){
            check = false;
        }
    })



   if(check){

   
    fetch(url, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    }).then((res) => {
       alert('Registered successfully.')
        navigate('/login');
    }).catch((err) => {
        alert('Failed :');
    });
}
else {
    alert("enter details again");
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
      <div style={{ marginBottom: '10px' }}>
        <label>Username:</label>

        <input
         className=' border-zinc-800 border-2 '
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
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
      <div style={{ marginBottom: '10px' }}>
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
        className=' border-zinc-800 border-2 '
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

export default Register;
