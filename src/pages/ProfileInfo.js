import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import ClaimStatus from '../component/ClaimSatus';
import RatingReviewModal from '../component/RatingReviewModal';

function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const policies = useSelector((state) => state.policies.policies);
  const [showClaimStatusModal, setShowClaimStatusModal] = useState(false);
  const navigate = useNavigate();
  
  const handleViewClaimStatus = () => {
    setShowClaimStatusModal(true);
  };

  const handleCloseClaimStatusModal = () => {
    setShowClaimStatusModal(false);
  };
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
            navigate('/editProfile');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    }
  }, []);
  

  let userPolicies = [];
  if (profileData && Array.isArray(profileData.policyBrought)) {
    userPolicies = policies.filter(policy => 
      profileData.policyBrought.includes(policy.id) || profileData.claim.includes(policy.id)
    );
  }



  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card p-4">
            <h2 className="mb-4 green fw-bold ">Profile Info</h2>
            {profileData && (
              <div>
                <div className="mb-3">
                  <label className="form-label green">Name:</label>
                  <p className="fw-bold">{profileData.name || '---'}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <p className="fw-bold">{profileData.email || '---'}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Profession:</label>
                  <p className="fw-bold">{profileData.profession || '---'}</p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Birth Date:</label>
                  <p className="fw-bold">{profileData.birthDate || '---'}</p>
                </div>
                {/* <div className="mb-3">
                  <label className="form-label"> Policies- Subscribe:</label>
                  <p className="fw-bold">{new Set(profileData.claim).size|| '---'}</p>
                </div> */}
                {/* <div className="mb-3">
                  <label className="form-label">Claim Policies:</label>
                  <p className="fw-bold">{new Set(totalPolocies).size|| '---'}</p>
                </div> */}
                <Link to="/editProfile" className="btn btn-outline-success rounded-0 ">
                  Edit Profile Info
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-8 offset-md-2">
          <h2 className="mb-4 fw-bold green">Policies History</h2>
          {userPolicies.map((policy) => (
            <div key={policy.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title heading green">{policy.coverageName}</h5>
                <p className="card-text">Type: {policy.type}</p>
                <p className="card-text">Category: {policy.category}</p>
                <p className="card-text">Price: {policy.price}</p>
                <button
        className="btn btn-outline-warning rounded-0 me-2 "
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Rate & Review
        
      </button> <RatingReviewModal policyId={policy.id} name={profileData.name}/>
     
                {profileData.policyBrought.includes(policy.id) ? (
                  <Link to={`/claim/${policy.id}`} className="btn btn-outline-primary rounded-0 ">
                    Claim
                  </Link>
                ) : (
                  <button
                  className="btn btn-outline-danger rounded-0"
                  onClick={handleViewClaimStatus}
                >
                  View Claim Status
                </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ClaimStatus
        show={showClaimStatusModal}
        handleClose={handleCloseClaimStatusModal}
      />
   
    </div>
    
  );
}

export default ProfilePage;
