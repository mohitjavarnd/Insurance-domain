
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPolicies } from '../store/policiesSlice';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
// import { db, auth } from '../config/firebase';
// import { toast } from 'react-toastify';
// import PolicyCard from '../component/PolicyCard';

// function PoliciesPage() {
//   const dispatch = useDispatch();
//   const policies = useSelector((state) => state.policies.policies);
//   const status = useSelector((state) => state.policies.status);
//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const selectedCategory = queryParams.get('category');
//   const searchQuery = queryParams.get('query');
//   const navigate = useNavigate();
//   const [filteredPolicies, setFilteredPolicies] = useState([]);
//   const user = auth.currentUser; 

//   useEffect(() => {
//     dispatch(fetchPolicies());
//   }, [dispatch]);

//   useEffect(() => {
//     let policiesToShow = policies;

//     if (selectedCategory) {
//       policiesToShow = policiesToShow.filter(policy => policy.category === selectedCategory);
//     }
//     if (searchQuery) {
//       const normalizedSearchQuery = searchQuery.toLowerCase();
//       policiesToShow = policiesToShow.filter(policy => 
//         policy.coverageName.toLowerCase().includes(normalizedSearchQuery) ||
//         policy.type.toLowerCase().includes(normalizedSearchQuery) ||
//         policy.category.toLowerCase().includes(normalizedSearchQuery) ||
//         policy.price.toString().includes(normalizedSearchQuery)
//       );
//     }

//     setFilteredPolicies(policiesToShow);
//   }, [policies, selectedCategory, searchQuery]);

//   const handleBuyNowClick = (policy) => {
//     if (!user) { 
//       navigate(`/SignIn`); 
//     } else {
//       const policyId = policy.id; 
//       console.log(policyId);
//       navigate(`/CheckoutPage/${policyId}`);
//     }
//   };
  

//   const handleAddToCompareClick = async (policyId) => {
//     if (user) {
//       const uid = user.uid;
//       const userRef = doc(db, 'users', uid);

//       try {
//         const userSnapshot = await getDoc(userRef);
//         const userData = userSnapshot.data();

//         const updatedCompareList = [...userData.compare, policyId];

//         await updateDoc(userRef, { compare: updatedCompareList });

//         console.log('Policy added to compare list');
//         toast.success('Added to Compare Section')
//       } catch (error) {
//         console.error('Error updating user data:', error);
//         toast.error("Can't add to compare policy section please try later")
//       }
//     } else {
//       console.error('No user is currently logged in');
//     }
// //   };
// import { usePolicyActions } from '../custom-hooks/usePolicyActions';
// import PolicyCard from '../component/PolicyCard';

// function PoliciesPage() {
//   const {
//     policies,
//     status,
//     handleBuyNowClick,
//     handleAddToCompareClick,
//     getPoliciesToShow
//   } = usePolicyActions();

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 text-center "> <span className='green'>Insurance</span> Policies</h2>
//       {status === 'loading' ? (
//         <div className="text-center green fw-bold  ">Loading policies...</div>
//       ) : (
//         <div className="row">
//           {filteredPolicies.map((policy) => (
//             <PolicyCard
//               key={policy.id}
//               policy={policy}
//               onBuyNowClick={handleBuyNowClick}
//               onAddToCompareClick={handleAddToCompareClick}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PoliciesPage;
import { usePolicyActions } from '../custom-hooks/usePolicyActions';
import PolicyCard from '../component/PolicyCard';
import { useLocation } from 'react-router-dom';

function PoliciesPage() {
  const {
    status,
    handleBuyNowClick,
    handleAddToCompareClick,
    getPoliciesToShow
  } = usePolicyActions();

  
  const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const selectedCategory = queryParams.get('category');
    const searchQuery = queryParams.get('query');
  const filteredPolicies = getPoliciesToShow(selectedCategory, searchQuery);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center "> <span className='green'>Insurance</span> Policies</h2>
      {status === 'loading' ? (
        <div className="text-center green fw-bold  ">Loading policies...</div>
      ) : (
        <div className="row">
          {filteredPolicies.map((policy) => (
            <PolicyCard
              key={policy.id}
              policy={policy}
              onBuyNowClick={handleBuyNowClick}
              onAddToCompareClick={handleAddToCompareClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PoliciesPage;
