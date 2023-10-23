import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doc, setDoc,getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';

function Claim() {
  const { id } = useParams();
  const navigate = useNavigate();
  const policies = useSelector((state) => state.policies.policies);
  const policy = policies.find(policy => policy.id === id);

  const [profileData, setProfileData] = useState(null);
  const [image, setImage] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);

      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    }
  }, []);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
  
    const user = auth.currentUser;
  
    if (user) {
      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);
  
      try {
        
        const updatedPolicyBrought = profileData.policyBrought.filter(policyId => policyId !== id);
  
        
        const updatedClaims = [...profileData.claim, id];
  
        
        await setDoc(userDocRef, {
          ...profileData,
          policyBrought: updatedPolicyBrought,
          claim: updatedClaims,
        });
        toast.success("Claim has been submitted");
        console.log('Policy claimed ');
        navigate('/ProfileInfo');
      } catch (error) {
        toast.error("Can't submit claim now ,Please try again later");
        console.error('Error claiming :', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className='green fw-bold '>Claim Policy</h2>
      {policy && (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title green fw-bold ">{policy.coverageName}</h5>
            <p className="card-text">Type: {policy.type}</p>
            <p className="card-text">Category: {policy.category}</p>
            <p className="card-text">Price: {policy.price}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleClaimSubmit}>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Query</label>
          <textarea
            className="form-control"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-outline-primary rounded-0 ">Submit Claim</button>
      </form>
    </div>
  );
}

export default Claim;
