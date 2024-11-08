import React, { useState } from 'react';
import './budget.css';
import { useNavigate } from 'react-router-dom';
export function Budget() {
  // State for total cash and buckets
  const navigate = useNavigate();

  const goToPayments = () => {
    navigate('/payments');
  };
  const [total, setTotal] = useState(0);
  const [leftover, setLeftover] = useState(0);
  const [buckets, setBuckets] = useState({
    rent: 0,
    groceries: 0,
    tuition: 0,
  });

  // Update the total and recalculate leftover
  const handleTotalChange = (e) => {
    const newTotal = parseFloat(e.target.value) || 0;
    setTotal(newTotal);
    calculateLeftover(newTotal, buckets);
  };

  // Update bucket values and recalculate leftover
  const handleBucketChange = (bucketName, value) => {
    const newBuckets = { ...buckets, [bucketName]: parseFloat(value) || 0 };
    setBuckets(newBuckets);
    calculateLeftover(total, newBuckets);
  };

  // Calculate leftover amount based on total and bucket sums
  const calculateLeftover = (total, buckets) => {
    const sumBuckets = Object.values(buckets).reduce((sum, value) => sum + value, 0);
    setLeftover(total - sumBuckets);
  };

  // Calculate progress percentage for each bucket
  const calculateProgress = (bucketValue) => {
    return total > 0 ? Math.min((bucketValue / total) * 100, 100) : 0;
  };

  return (
    <main className="container py-5">
      <div className="row">
        {/* Total Cash Section */}
        <div className="col-md-12">
          <h2>Total</h2>
          <div className="total-box p-4 mb-4">
            <form id="totalForm">
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  id="totalInput" 
                  className="form-control" 
                  placeholder="Enter Total Cash" 
                  required 
                  value={total}
                  onChange={handleTotalChange}
                />
              </div>
              <div>
                <span>Leftover:</span>
                <input 
                  type="text" 
                  id="leftover" 
                  className="form-control d-inline-block w-50" 
                  placeholder="Calculated Leftover" 
                  readOnly 
                  value={leftover}
                />
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-12">
          <h2>Buckets</h2>
          <div className="row">
            {/* Rent Bucket */}
            <Bucket 
              label="Rent" 
              icon="images/house.png" 
              value={buckets.rent} 
              onChange={(value) => handleBucketChange('rent', value)} 
              progress={calculateProgress(buckets.rent)} 
            />

            {/* Groceries Bucket */}
            <Bucket 
              label="Groceries" 
              icon="images/food.png" 
              value={buckets.groceries} 
              onChange={(value) => handleBucketChange('groceries', value)} 
              progress={calculateProgress(buckets.groceries)} 
            />

            {/* Tuition Bucket */}
            <Bucket 
              label="Tuition" 
              icon="images/tuition.jpeg" 
              value={buckets.tuition} 
              onChange={(value) => handleBucketChange('tuition', value)} 
              progress={calculateProgress(buckets.tuition)} 
            />
          </div>
        </div>

        {/* Add Bucket and Share */}
        <div className="col-md-12">
          {/* <button type="button" className="btn btn-primary mb-3">Add new bucket</button> */}
          <form method="get" onClick={goToPayments} className="d-inline-block">
            <button type="submit" className="btn btn-success mb-3">Add Purchase</button>
          </form>
          <div>
            <span>Share Budget With:</span>
            <input type="email" className="form-control d-inline-block w-50" placeholder="user email" required />
            <button type="submit" className="btn btn-info">Share</button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Separate Bucket component
function Bucket({ label, icon, value, onChange, progress }) {
  return (
    <div className="col-md-4 col-sm-12">
      <div className="bucket p-4 mb-4">
        <img src={icon} alt={`${label} Icon`} style={{ width: '20px', height: '20px' }} />
        <span>{label}</span>
        <input 
          type="number" 
          className="form-control bucket-input" 
          placeholder="Enter Amount" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* Progress bar */}
        <div className="progress mt-3">
          <div 
            className="progress-bar" 
            role="progressbar" 
            style={{ width: `${progress}%` }} 
            aria-valuenow={progress} 
            aria-valuemin="0" 
            aria-valuemax="100">
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}
