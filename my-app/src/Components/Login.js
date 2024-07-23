import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
     e.preventDefault();
    const url='http://localhost:5000/api/auth/login';
    const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3MTNlYWVlY2M1N2ZiNGY0MDVjODA5In0sImlhdCI6MTcxODczMDI4NH0.f7DGhhaooWVVnqBScT6UZjhD-LgaeoKiJw8ECqSQCFw"
        },
        body: JSON.stringify({email,password}),
      });
      const json =await response.json();
   console.log(json);
   if(json.success){
    //Save the Auth token and redirect
   localStorage.setItem('token',json.authtoken);
navigate('/');
   }else{
    alert("Invalid Credentials")
   }
    }


  return (
    <div>
        <h1 >Login</h1>
    <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input  value={email}  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input  value={password}  onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password"/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
