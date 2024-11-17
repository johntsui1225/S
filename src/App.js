import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register'; 
import Login from './components/Login';
import Transfer from './components/Transfer';
import PaymentComponent from './components/PaymentComponent';  // Adjust path as necessary




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/payment" element={<PaymentComponent />} /> 



      </Routes>
    </Router>
  );
}

export default App;
