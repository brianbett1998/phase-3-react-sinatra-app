import React, { useEffect, useState } from 'react';
import Car from './Car';

function CarList() {
  const [cars, setCars] = useState([]);

  // Fetch cars data from API
  useEffect(() => {
    fetch('http://localhost:9292/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.log(error));
  }, []);

  const handleCreateCar = (newCar) => {
    // Send POST request to create a new car
    fetch('http://localhost:9292/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    })
      .then(response => response.json())
      .then(data => {
        // Add the newly created car to the state
        setCars([...cars, data]);
      })
      .catch(error => console.log(error));
  };

  const handleUpdateCar = (carId, updatedCar) => {
    // Send PUT request to update the car
    fetch(`http://localhost:9292/cars/${carId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar),
    })
      .then(response => response.json())
      .then(data => {
        // Update the car in the state
        setCars(cars.map(car => (car.id === carId ? data : car)));
      })
      .catch(error => console.log(error));
  };

  const handleDeleteCar = (carId) => {
    // Send DELETE request to delete the car
    fetch(`http://localhost:9292/cars/${carId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Remove the deleted car from the state
          setCars(cars.filter(car => car.id !== carId));
        } else {
          console.log('Failed to delete the car');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      {cars.map(car => (
        <Car
          key={car.id}
          car={car}
          handleUpdateCar={handleUpdateCar}
          handleDeleteCar={handleDeleteCar}
        />
      ))}
    </div>
  );
}

export default CarList;
