import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RatingReviewModal = ({ policyId, name }) => {
  const [starRating, setStarRating] = useState('1'); 
  const [review, setReview] = useState('');

console.log(policyId);

  const handleSubmitRating = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://653156964d4c2e3f333cdc4b.mockapi.io/insurance/review', {
        starRating,
        review,
        policyId,
        name,
      });
  

      if (response.status === 201) {
        toast.success("Your review has been submitted");
        console.log('send');
      } else {

        console.error();
      }
  
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  

  return (
    <div className="modal fade" id="ratingModal" tabIndex="-1" aria-labelledby="ratingModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-warning fs-2" id="ratingModalLabel">Rate this Policy</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmitRating}>
              <div className="mb-3">
                <label className="form-label">Star Rating:</label>
                <select
                  className="form-select"
                  value={starRating}
                  onChange={(e) => setStarRating(e.target.value)}
                >
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Review:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-outline-warning rounded-0 ">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingReviewModal;
