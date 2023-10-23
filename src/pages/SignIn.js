import React, { useState } from 'react';
import { signInWithEmailAndPassword , signInWithPopup  } from 'firebase/auth';
import {  auth, provider } from "../config/firebase";
import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

import { setPersistence, browserSessionPersistence } from 'firebase/auth';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  const handleSignIn = async () => {
    try {
       await signInWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserSessionPersistence);
      console.log("usermatch");
      // dispatch(setUser(userData));
      toast.success("Signin success now add some info please to continue");
      navigate('/EditProfile'); 
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password. Please try again.");
    }
  };
  
    const handleSignInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, provider);
        toast.success("Signin success");
        navigate('/'); 
      } catch (error) {
        console.error("Error signing in with Google:", error);
        toast.error("Invalid email or password. Please try again.");
      }
    };
  return (
    <div className="container mt-5  p-3">
        <div className="row justify-content-center">
    <div className="col-12 col-sm-8 col-md-6 col-lg-4 card p-5">
      <h2 className='green'>Long Time No See!</h2>
      <p className='green'>Please sign in to access your account.</p>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="btn btn-outline-success rounded-0 mb-3 "
        onClick={handleSignIn}
      >
        Sign In
      </button>
      <button onClick={handleSignInWithGoogle}  className="login-with-google-btn" > Sign In with Google</button>
      <div className="mt-3">
        <p>New User? <Link to="/SignUp">Sign Up Here</Link></p>
      </div>
    </div>
    </div></div>
  );
};

export default SignIn;
