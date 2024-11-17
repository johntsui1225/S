import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div>
      <h1>Welcome to the Crypto-Poker Club</h1>
      <p></p>
      <button> <Link to="/login">Go to Login</Link> </button> <button> <Link to="/register">Go to Register</Link> </button> <button> <Link to="/transfer">Go to Transfer</Link> </button> <button> <Link to="/payment">Go to Payment</Link> </button>
    </div>
  );
}

export default Home;
