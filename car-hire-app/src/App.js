import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AddReviewForm from './components/AddReviewForm';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9292/cars');
        const data = await response.json();
        setCars(data.map((car) => ({ ...car, image_url: '' })));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleBuyCar = (carId) => {
    // Send DELETE request to API to buy the car
    fetch(`http://localhost:9292/cars/${carId}`, { method: 'DELETE' })
      .then((response) => {
        if (response.ok) {
          // If the request was successful, remove the bought car from the state
          setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
        } else {
          console.log('Failed to buy the car');
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAddReview = (carId, reviewText) => {
    const newReview = {
      rating: 5, // Set the desired rating value
      comment: reviewText // Use the review text entered by the user
    };

    fetch(`http://localhost:9292/cars/${carId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    })
      .then((response) => {
        if (response.ok) {
          setCars((prevCars) =>
            prevCars.map((car) => {
              if (car.id === carId) {
                return {
                  ...car,
                  reviews: [...car.reviews, newReview]
                };
              }
              return car;
            })
          );
        } else {
          console.log('Failed to add review');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1 className="my-4">Auto Cars</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          <p>Browse our selection of cars on sale and pick your choice</p>
          <ul className="list-group">
            {cars.map((car) => (
              <li key={car.id} className="list-group-item">
                <img src={car.image_url} alt="Car" className="img-car" />
                <h2>
                  {car.make} {car.model}
                </h2>
                <p>Year: {car.year}</p>
                <p>Color: {car.color}</p>
                <p>Price: ${car.price}</p>
                <p>Available: {car.available ? 'Yes' : 'No'}</p>
                <h3>Reviews</h3>
                <ul className="list-group">
                  {car.reviews.map((review) => (
                    <li key={review.id} className="list-group-item">
                      <p>Rating: {review.rating}</p>
                      <p>Comment: {review.comment}</p>
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleBuyCar(car.id)}
                >
                  Buy Now
                </button>
                <AddReviewForm
                  carId={car.id}
                  handleAddReview={handleAddReview}
                />
              </li>
            ))}
          </ul>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
