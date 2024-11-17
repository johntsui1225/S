import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

// Load the Stripe instance with your publishable key
const stripePromise = loadStripe('pk_test_51PzBF6IXQb98EJG7JrabcM0I7YjwoN25yt7PSvlNhqTjBRtHCcc5bQqXTQ8hug1agnCusifpv1PaIJneVp6mCY6D00ssYFSvlr');

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements(); // Get the Stripe elements instance

  const handlePayment = async () => {
    if (!stripe || !elements) return; // Ensure Stripe.js has loaded

    try {
      // Step 1: Create payment intent on the backend
      const { data } = await axios.post('http://localhost:5001/api/payments/create-payment-intent', {
        amount: amount,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
        },
      });

      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment with Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        console.error('Payment failed:', error.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Step 3: Confirm payment and update user balance
        await axios.post('http://localhost:5001/api/payments/confirm-payment', {
          paymentIntentId: paymentIntent.id,
          amount: amount,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        alert('Payment successful! Balance updated.');
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Enter amount to pay"
      />
      <CardElement /> {/* Stripe Card Input */}
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

// Wrap the payment form with Elements provider to handle Stripe's context
const PaymentComponent = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentComponent;
