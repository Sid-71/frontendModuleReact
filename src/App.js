
import { Navigate, Route, Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/Register/Register';

import { useEffect, useState } from 'react';
import CurrencyHome from './components/currencyConverter/CurrencyHome';
import Protected from './Protected.js';


function App() {
// React Hook
//  const [location,setLocation] = useState('');
//   function Solve(){
//     const location = useLocation(); 

//     console.log("location",location.pathname);
//     set
//     if(location.pathname == '/')
//     {
//       Navigate('/login');
//     }
//   }
// useEffect(()=>{
//   Solve()
// },[location.pathname])
  

useEffect(()=>{
  console.log("email from local storge",localStorage.getItem('email'));
})
  return (
    <Routes>
     <Route path='/' element={<Protected Component={Home} />}></Route>
     {/* <Route path='/login' element={<Protected component={<Login />} />}></Route> */}
     {/* <Route path='/register' element={<Protected component={<Register />} />}></Route> */}
     <Route path='/currency' element={<Protected Component={CurrencyHome} />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
     {/* <Route path='/currency' element={<CurrencyHome />}></Route>  */}
     
    </Routes>
   
  );
}

export default App;
