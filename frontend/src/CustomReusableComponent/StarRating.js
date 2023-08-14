import React, { useState } from 'react';

const Star = ({ selected, onClick }) => (
  <span style={{ cursor: 'pointer' }} onClick={onClick}>
    {selected ? <i class="fa-solid fa-star" style="color: #d36536;"></i> : <i class="fa-thin fa-star" style="color: #000000;"></i>}
  </span>
);

const StarRating = ({ totalStars, size, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div style={{ fontSize: size }}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          selected={index < rating}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;