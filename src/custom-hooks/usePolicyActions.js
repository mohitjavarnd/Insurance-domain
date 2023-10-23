import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPolicies } from '../store/policiesSlice';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { db, auth } from '../config/firebase';
import { toast } from 'react-toastify';

export function usePolicyActions() {
  const dispatch = useDispatch();
  const policies = useSelector((state) => state.policies.policies);
  const status = useSelector((state) => state.policies.status);
  const navigate = useNavigate();
  const user = auth.currentUser; 

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleBuyNowClick = (policy) => {
    if (!user) { 
      navigate(`/SignIn`); 
    } else {
      const policyId = policy.id; 
      console.log(policyId);
      navigate(`/CheckoutPage/${policyId}`);
    }
  };
  const handleAddToCompareClick = async (policyId) => {
    const user = auth.currentUser;
  
    if (user) {
      const uid = user.uid;
      const userRef = doc(db, 'users', uid);
  
      try {
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
  
        const updatedCompareList = [...userData.compare, policyId];
  
        await updateDoc(userRef, { compare: updatedCompareList });
  
        console.log('Policy added ');
        toast.success('Added to Compare Section');
      } catch (error) {
        console.error('Error:', error);
        toast.error("Can't add to compare policy section, please try later");
      }
    } else {
      console.error('No user is currently logged in');
      
    }
  };
  

  const getPoliciesToShow = (selectedCategory, searchQuery) => {
    let policiesToShow = policies;

    if (selectedCategory) {
      policiesToShow = policiesToShow.filter(policy => policy.category === selectedCategory);
    }
    if (searchQuery) {
      const normalizedSearchQuery = searchQuery.toLowerCase();
      policiesToShow = policiesToShow.filter(policy => 
        policy.coverageName.toLowerCase().includes(normalizedSearchQuery) ||
        policy.type.toLowerCase().includes(normalizedSearchQuery) ||
        policy.category.toLowerCase().includes(normalizedSearchQuery) ||
        policy.price.toString().includes(normalizedSearchQuery)
      );
    }

    return policiesToShow;
  };

  return {
    policies,
    status,
    handleBuyNowClick,
    handleAddToCompareClick,
    getPoliciesToShow
  };
}
