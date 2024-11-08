import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Payments({ total, setTotal, buckets, setBuckets, payments, setPayments }) {
  const [amount, setAmount] = useState('');
  const [selectedBucket, setSelectedBucket] = useState('bucket1'); // Track which bucket is selected
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Track if the button has been pressed
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    // Process the payment (e.g., subtract from total and the selected bucket)
    setTotal(total - amount); // Subtract from total
    setBuckets({
      ...buckets,
      [selectedBucket]: buckets[selectedBucket] - amount, // Subtract from the selected bucket
    });

    // Record the payment
    setPayments([...payments, { amount, date: new Date(), bucket: selectedBucket }]);

    // Show success message
    setPaymentSuccess(true);
    setSubmitted(true); // Disable the button after submission

    // Reset the state after 3 seconds (or adjust timing as needed)
    setTimeout(() => {
      setPaymentSuccess(false);
      setAmount('');
      setSubmitted(false); // Re-enable the button
    }, 3000); // 3 seconds for success message
  };

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
              disabled={submitted} // Disable the input after payment is submitted
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
              disabled={submitted} // Disable selection after payment is submitted
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
            disabled={submitted} // Disable after submission
          >
            {submitted ? 'Payment Submitted' : 'Submit Payment'}
          </button>

          {/* Success Message */}
          {paymentSuccess && (
            <div className="alert alert-success mt-3">
              Payment successfully processed!
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
