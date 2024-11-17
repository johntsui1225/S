import React, { useState } from 'react';
import axios from 'axios';


function Transfer() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const logLocalStorage = () => {
    console.log(localStorage); // This will log the localStorage object
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      alert('User not logged in');
      return;
    }

    try {
      // Make the transfer request with the token in the Authorization header
      await axios.post('http://localhost:5001/api/transactions/transfer', { receiver, amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Transfer successful');
    } catch (error) {
      console.error('Transfer failed', error);
      alert('Transfer failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Receiver Username" />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <button type="submit">Transfer</button>
      <button onClick={logLocalStorage}>Log localStorage</button>
    </form>
  );
}

export default Transfer;
