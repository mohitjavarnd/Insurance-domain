import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

function ComparePage() {
  const user = auth.currentUser;
  const [comparedPolicies, setComparedPolicies] = useState([]);
  const policies = useSelector((state) => state.policies.policies);
  const [compareBy, setCompareBy] = useState(null);
  const navigate = useNavigate();

  const handleBuyNowClick = (policy) => {
    const policyId = policy.id;
    console.log(policyId);
    navigate(`/CheckoutPage/${policyId}`);
};

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, 'users', uid);

        try {
          const userSnapshot = await getDoc(userRef);
          const userData = userSnapshot.data();
          
          const comparedPolicies = userData.compare;

         
          const matchingPolicies = policies.filter(policy => comparedPolicies.includes(policy.id));

          setComparedPolicies(matchingPolicies);
        } catch (error) {
          console.error('Error fetching user :', error);
        }
      }
    };

    fetchData();
  }, [user, policies]);

  const handleCompareByPrice = () => {
    setCompareBy('price');
  };

  const handleCompareByCoverage = () => {
    setCompareBy('coverage');
  };

  const sortPolicies = (policies, compareBy) => {
    return policies.sort((a, b) => {
      if (compareBy === 'price') {
        return a.price - b.price;
      } else if (compareBy === 'coverage') {
        return b.coverage - a.coverage;
      }
      return 0;
    });
  };

  const sortedPolicies = compareBy ? sortPolicies(comparedPolicies, compareBy) : comparedPolicies;
  console.log(sortedPolicies);
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center "> <span className='green'>Compared </span>Policies</h2>

      <div className="text-center mb-3">
        <button className="btn btn-outline-success rounded-0" onClick={handleCompareByPrice}>Compare by Price</button>
        <button className="btn btn-outline-primary rounded-0 ms-3" onClick={handleCompareByCoverage}>Compare by Coverage</button>
      </div>

      <div className="row">
        {sortedPolicies.map((policy) => (
          <div className="col-md-6 mb-4">
  <div key={policy.id} className="card">
    <div className="card-body">
      <h5 className="card-title green heading">{policy.coverageName}</h5>
      <p className="card-text">Type: {policy.type}</p>
      <p className="card-text">Category: {policy.category}</p>
      <p className="card-text">Price: {policy.price}</p>
      <p className="card-text">Coverage: {policy.coverage}L</p><button className="btn btn-success rounded-0" onClick={() => handleBuyNowClick(policy)}>Buy Now</button>

    </div>
  </div>

 
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComparePage;
