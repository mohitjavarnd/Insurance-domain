import React, { useState } from "react";
import axios from 'axios';

const PolicyCard = ({ policy, onBuyNowClick, onAddToCompareClick }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleBuyNow = () => {
    onBuyNowClick(policy);
  };

  const handleAddToCompare = () => {
    onAddToCompareClick(policy.id);
  };
  const handleViewReviews = () => {
    axios.get(`https://653156964d4c2e3f333cdc4b.mockapi.io/insurance/review?policyId=${policy.id}`)
      .then(response => {
        setReviews(response.data);
        setShowReviewModal(true);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  };


  return (
    <div className="col-md-4 mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title green heading">{policy.coverageName}</h5>
          <p className="card-text">Type: {policy.type}</p>
          <p className="card-text">Category: {policy.category}</p>
          <p className="card-text">Price: {policy.price}</p>
          <p className="card-text">coverage: {policy.coverage}L</p>
          <button className="btn btn-outline-success rounded-0 m-1" onClick={handleBuyNow}>Buy Now</button>
          <button className="btn btn-outline-primary rounded-0 m-1" onClick={handleAddToCompare}>Add to Compare</button>
          <button className="btn btn-outline-warning rounded-0 m-1" onClick={handleViewReviews}>View Reviews</button>
        </div>
      </div>

      
      <div className={`modal ${showReviewModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-warning">Reviews for {policy.coverageName}</h5>
              <button type="button" className="btn-close" onClick={() => setShowReviewModal(false)}></button>
            </div>
            <div className="modal-body">
              {reviews.map(review => (
                <div key={review.id}>
                  <p>Rating: {review.starRating} Stars</p>
                  <p>Review: {review.review}</p>
                  <p>Reviewer: {review.name}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PolicyCard;
