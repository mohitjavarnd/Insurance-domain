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
