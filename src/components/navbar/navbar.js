import { Logout } from '@mui/icons-material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  
const navigate = useNavigate();
    function Logout(){
      console.log("errors is coming ",234);
      localStorage.clear();
    console.log("after deelting eamil is ",localStorage.getItem('email'));
      
      navigate('/login')
  }
  
  
  return (
   
    

    <div >
        <div  className = " bg-emerald-200" style={{
          
            height : "80px",
            display : "flex",
            justifyContent :"space-between"
        }} >
          <div style={{
             margin : "22px 20px",
             color : "black",
             fontSize:"25px",
             fontWeight:"inherit"

        }}  > React Part</div>


          <div style={{
            display:"flex",
           
           
            width:"40%",
            fontSize:"25px",
            justifyContent:"space-around"
          }}> 
            <p className=' mt-auto mb-auto font-medium'> <Link to='/'>Todo</Link></p>
            <p className=' mt-auto mb-auto font-medium'> <Link to='/currency'> Currency </Link></p>
            <p  className=' mt-auto mb-auto font-medium'><Link to='/login'> Login </Link></p>
            <p  className=' mt-auto mb-auto font-medium'><Link to='/register'> Signup </Link></p>
            <button onClick={Logout} className=' mt-auto mb-auto font-medium'>Logout</button>
            
          </div>


        </div>
    </div>
  )
}

export default Navbar