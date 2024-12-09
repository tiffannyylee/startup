import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MockWebSocket } from './mockWebsocket';
import { useEffect } from 'react';


export function Payments({ total, setTotal, buckets, setBuckets, payments, setPayments }) {
  const [amount, setAmount] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('bucket1');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState([]); // Stores all WebSocket payments
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    // Process the payment
    setTotal(total - amount);
    setBuckets({
      ...buckets,
      [selectedBucket]: buckets[selectedBucket] - amount,
    });

    const newLeftover = total - amount - Object.values(buckets).reduce((sum, val) => sum + val, 0) + buckets[selectedBucket];


    const token = localStorage.getItem('token');
    fetch('/api/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        total_cash: total - amount,
        buckets: {
          ...buckets,
          [selectedBucket]: buckets[selectedBucket] - amount,
        },
        leftover: newLeftover,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to save budget');
        return response.json();
      })
      .then(() => {
        console.log('Budget updated successfully');
      })
      .catch((error) => console.error('Error saving budget:', error));

      const newPayment = { amount, date: new Date().toISOString(), bucket: selectedBucket };
      //const updatedPayments = [...payments, newPayment];
      setPayments(updatedPayments);
    
      // Save payments via API
      savePayments(newPayment);
    
      // Show success message
      setPaymentSuccess(true);
      setSubmitted(true);
    
      // Reset the state after 1.5 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
        setAmount('');
        setSubmitted(false);
      }, 1500);
    };

  // Function to handle new WebSocket payments and update the history
  const handleNewPayment = (newPayment) => {
    setPaymentHistory((prevHistory) => [...prevHistory, newPayment]);
  };

  //saving payments via api
  const savePayments = (newPayment) => {
    //const token = localStorage.getItem('token');
    //const normalizedPayments = newPayments.flat(Infinity); // Flatten the structure before saving
    fetch('/api/payments', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payments: newPayment }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to save payments');
        return response.json();
      })
      .then(() => {
        console.log('Payments saved successfully');
      })
      .catch((error) => console.error('Error saving payments:', error));
  };

  useEffect(() => {
    fetch('/api/payments', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch payments');
        return response.json();
      })
      .then((data) => {
        setPayments(data.payments);
        console.log('Fetched payments:', data.payments);
      })
      .catch((error) => console.error('Error fetching payments:', error));
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <main className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <h2>Submit Payment</h2>
          
          {/* Amount Input */}
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Payment Amount"
              disabled={submitted}
            />
          </div>

          {/* Bucket Selection */}
          <div className="mb-3">
            <label htmlFor="bucketSelect" className="form-label">Select Bucket</label>
            <select
              id="bucketSelect"
              className="form-select"
              value={selectedBucket}
              onChange={(e) => setSelectedBucket(e.target.value)}
              disabled={submitted}
            >
              {Object.keys(buckets).map((bucket) => (
                <option key={bucket} value={bucket}>
                  {bucket.charAt(0).toUpperCase() + bucket.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Payment Button */}
          <button
            className="btn btn-primary"
            onClick={handlePayment}
            disabled={submitted}
          >
            {submitted ? 'Payment Submitted' : 'Submit Payment'}
          </button>

          {/* Success Message */}
          {paymentSuccess && (
            <div className="alert alert-success mt-3">
              Payment successfully processed!
            </div>
          )}

          {/* Payment History Section */}
          <h4 className="mt-5">Payment History</h4>
          <ul className="list-group">
            {payments.map((payment, index) => (
              <li key={index} className="list-group-item">
                {new Date(payment.date).toLocaleString()} - ${payment.amount} to {payment.bucket}
              </li>
            ))}
          </ul>

          {/* WebSocket Payment History Section */}
          <h4 className="mt-5">WebSocket Payment History</h4>
          <ul className="list-group">
            {paymentHistory.map((payment, index) => (
              <li key={index} className="list-group-item">
                {payment.timestamp} - ${payment.amount} to {payment.bucket}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Insert Mock WebSocket */}
      <MockWebSocket onMessage={handleNewPayment} />
    </main>
  );
}
