import { auth , db} from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSignUp = async () => {
    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
  
      const uid = userCredential.user.uid;
      const userDocRef = doc(db, 'users', uid);
  
  
      await setDoc(userDocRef, {
        name: '',
        profession: '',
        birthDate: '',
        email: email,
        policyBrought: [],
        claim: [],
        compare: [],
      });
  
      toast.success("Signup successful!");
      navigate("/SignIn");
    } catch (err) {
      console.error(err);
      toast.error("Error signing up. Please try again.");
    }
  };
  

  return (
    <div className="container mt-5 p-3">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 card p-5">
          <h2 className='green'>Insurance domain welcome to!</h2>
          <p className='green'>Become part of our 1.2+ millions family</p>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Password..."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-primary rounded-0" onClick={handleSignUp}>
            Sign Up
          </button>
          <p className="mt-3 text-center">
            Already a family member? <span className="green" onClick={() => navigate("/SignIn")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
