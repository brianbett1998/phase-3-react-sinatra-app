import React, { useState } from 'react';

const AddReviewForm = ({ carId, handleAddReview }) => {
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddReview(carId, reviewText);
    setReviewText('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-review">
      <input
        type="text"
        placeholder="Write a review..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-2">
        Add Review
      </button>
    </form>
  );
};

export default AddReviewForm;
