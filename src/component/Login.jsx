import React, { useState } from "react";
import {   useHistory} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
   
  const [err, setErr] = useState(false);
  const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayEmail = e.target[0].value;
    const displayPassword = e.target[1].value;
    try {
      const res= await signInWithEmailAndPassword(auth, displayEmail, displayPassword);
      let y= res.user.displayName
      console.log(y);
      let x= res.user.displayName.split('@')[1]
      localStorage.setItem('user',JSON.stringify(res.user))
      console.log(x)

     x=='user' ?navigate.push("/user"):navigate.push("/cook")
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form  onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        {/* <p>You don't have an account? <a href="/register">Register</a></p> */}
      </div>
    </div>
  );
};

export default Login;
