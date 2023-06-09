import React from 'react';

const Car = ({ car, handleBuyCar }) => {
  return (
    <div className="car">
      <img src={car.image} alt={car.make} />
      <h2>{car.make} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Color: {car.color}</p>
      <p>Price: ${car.price}</p>
      <p>Available: {car.available ? 'Yes' : 'No'}</p>
      <h3>Reviews</h3>
      <ul>
        {car.reviews.map((review) => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => handleBuyCar(car.id)}>Buy Now</button>
    </div>
  );
};

export default Car;
