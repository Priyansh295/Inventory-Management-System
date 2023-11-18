// Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Client.scss'

const Home = () => {
  return (
    <div className="client-home-container">
      <header>
        <h1>Welcome to AutoMart</h1>
        <p>Your one-stop shop for quality vehicles</p>
      </header>

      <section className='info'>
        <section className="featured-products">
          <h2>Featured Vehicles</h2>
          <div className="product-list">
            {/* Display a list of featured vehicles with images and brief details */}
            {/* Example: */}
            <div className="product">
            <img src={`${process.env.PUBLIC_URL}/images/toyota-camry.jpeg`} alt="Car 1" />
              <h3>Toyota Campry</h3>
              <p>Price: Rs:1825000.00</p>
              <Link to="/products">View Details</Link>
            </div>
            <div className="product">
            <img src={`${process.env.PUBLIC_URL}/images/chevrolet.jpeg`} alt="Car 2" />
              <h3>Chevrolet</h3>
              <p>Price: Rs:2190000.00</p>
              <Link to="/products">View Details</Link>
            </div>

            {/* Repeat similar blocks for other featured vehicles */}
          </div>
        </section>

      <section className="special-offers">
        <h2>Special Offers</h2>
        <div className="offer-list">
          {/* Display a list of special offers with images and brief details */}
          {/* Example: */}
          <div className="offer">
            <img src={`${process.env.PUBLIC_URL}/images/ford-150.jpeg`} alt="Special Offer 1" />
            <h3>Special Offer </h3>
            <p>Save 20% on SUVs this month</p>
            <Link to="/products">View Offer</Link>
          </div>

          {/* Repeat similar blocks for other special offers */}
        </div>
      </section>
      </section>
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          AutoMart is dedicated to providing high-quality vehicles with exceptional service.
          Explore our range of cars, trucks, and SUVs to find the perfect vehicle for you.
        </p>
      </section>
    </div>
  );
};

export default Home;
