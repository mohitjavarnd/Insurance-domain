// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector ,useDispatch} from 'react-redux';
// import { fetchPolicies } from '../store/policiesSlice';
// import { useNavigate } from 'react-router-dom';
// import PolicyCard from '../component/PolicyCard';
// import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
// import { toast } from 'react-toastify';
// import { db, auth } from '../config/firebase';

// function Home() {
//   const dispatch = useDispatch();
//     const policies = useSelector((state) => state.policies.policies.slice(0, 6));
    
//     const status = useSelector((state) => state.policies.status);
//     const navigate = useNavigate();
//     const user = auth.currentUser; 
//     useEffect(() => {
//       dispatch(fetchPolicies());
//     }, [dispatch]);

//     const handleBuyNowClick = (policy) => {
//       if (!user) { 
//         navigate(`/SignIn`); 
//       } else {
//         const policyId = policy.id;
//         console.log(policyId);
//         navigate(`/CheckoutPage/${policyId}`);
//       }
//     };

//     const handleAddToCompareClick = async (policyId) => {
//         if (user) {
//           const uid = user.uid;
//           const userRef = doc(db, 'users', uid);
    
//           try {
//             const userSnapshot = await getDoc(userRef);
//             const userData = userSnapshot.data();
    
//             const updatedCompareList = [...userData.compare, policyId];
    
//             await updateDoc(userRef, { compare: updatedCompareList });
    
//             console.log('Policy added to compare list');
//             toast.success('Added to Compare Section')
//           } catch (error) {
//             console.error('Error updating user data:', error);
//             toast.error("Can't add to compare policy section please try later")
//           }
//         } else {
//           console.error('No user is currently logged in');
//         }
//       };
import { usePolicyActions } from '../custom-hooks/usePolicyActions';
import {  Link } from 'react-router-dom';
import PolicyCard from '../component/PolicyCard';
import {  auth } from '../config/firebase';
function Home() {
  const {
    policies,
    status,
    handleBuyNowClick,
    handleAddToCompareClick,

  } = usePolicyActions();

      const user = auth.currentUser;

    return (
        <div>
            <div id="intro-example" className="p-5 text-center bg-image container-fluid">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="text-white">
                        <h1 className="mb-3 text-capitalize">INSURANCE DOMAIN</h1>
                        <h5 className="mb-4 mx-auto mobile-view-error-h5 w-50">The Insurance Domain encompasses a broad spectrum of financial services focused on risk management and protection. It involves policies, premiums, and claims to safeguard individuals, businesses, and assets from unforeseen events, providing peace of mind and financial security.</h5>
  <Link className="btn btn-outline-success rounded-0 text-white btn-lg m-2 border-white" to="/PoliciesPage">All Policies</Link>
  <Link 
  className="btn btn-outline-success rounded-0 text-white btn-lg m-2 border-white" 
  to={user ? "/ProfileInfo" : "/SignIn"}
>
  Profile Info
</Link>

                    </div>
                </div>
            </div>
            <div className="container mt-5">
      <h2 className="mb-4 text-center ">
        <span className='green'>Insurance</span> Policies
      </h2>
      {status === 'loading' ? (
        <div className="text-center">Loading policies...</div>
      ) : (
        <>
          <div className="row">
            {policies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onBuyNowClick={handleBuyNowClick}
                onAddToCompareClick={handleAddToCompareClick}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link className="btn btn-outline-success rounded-0  btn-lg m-2 " to="/PoliciesPage">
              More-Policies
            </Link>
          </div>
        </>
      )}
    </div>

        </div>
    );
}

export default Home;
