import React, { useState } from 'react';

export function Payments({ total, setTotal, buckets, setBuckets, setPayments }) {
  const [amount, setAmount] = useState('');
  const [bucket, setBucket] = useState('bucket1');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert amount to a number and validate
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) return;

    // Update the selected bucket by deducting the payment amount
    const updatedBuckets = { ...buckets, [bucket]: buckets[bucket] - paymentAmount };
    setBuckets(updatedBuckets);

    // Update the total cash available
    setTotal(total - paymentAmount);

    // Record the payment
    setPayments([
        ...payments,
        { amount: paymentAmount, bucket, date }
      ]);

    // Clear the form fields
    setAmount('');
    setBucket('bucket1');
    setDate('');
  };

  return (
    <main className="container mt-5 pt-5">
      <div className="bg-white p-4 shadow rounded">
        <h2>Payments</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Enter a new purchase:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="bucket" className="form-label">Select a bucket:</label>
            <select
              className="form-select"
              id="bucket"
              name="buckets"
              required
              value={bucket}
              onChange={(e) => setBucket(e.target.value)}
            >
              <option value="bucket1">Rent</option>
              <option value="bucket2">Groceries</option>
              <option value="bucket3">Tuition</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date of purchase:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Payment</button>
        </form>
      </div>
    </main>
  );
}
