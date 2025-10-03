import React from 'react';

function Hero() {
  return (
    <header className="bg-dark text-white text-center py-5">
      <div className="container">
        <h1>Welcome to PizzaShop</h1>
        <p>The best pizza in town, fresh & delicious</p>
        <a href="#menu" className="btn btn-warning btn-lg">Order Now</a>
      </div>
    </header>
  );
}

export default Hero;
