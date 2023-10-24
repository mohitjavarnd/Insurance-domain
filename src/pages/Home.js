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
      const limitedPolicies = policies.slice(0, 6);

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
            {limitedPolicies.map((policy) => (
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
