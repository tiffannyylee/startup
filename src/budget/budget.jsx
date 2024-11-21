import React, { useState } from 'react';
import './budget.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export function Budget({ total, setTotal, buckets, setBuckets }) {
  const navigate = useNavigate();

  const goToPayments = () => {
    navigate('/payments');
  };

  const [leftover, setLeftover] = useState(0);
  const [users, setUsers] = React.useState('this is a test');

  const handleTotalChange = (e) => {
    const newTotal = parseFloat(e.target.value) || 0;
    setTotal(newTotal);
    calculateLeftover(newTotal, buckets);
  };

  const handleBucketChange = (bucketName, value) => {
    const newBuckets = { ...buckets, [bucketName]: parseFloat(value) || 0 };
    setBuckets(newBuckets);
    calculateLeftover(total, newBuckets);
  };

  const calculateLeftover = (total, buckets) => {
    const sumBuckets = Object.values(buckets).reduce((sum, value) => sum + value, 0);
    setLeftover(total - sumBuckets);
  };

  const calculateProgress = (bucketValue) => {
    return total > 0 ? Math.min((bucketValue / total) * 100, 100) : 0;
  };

  function handleClick() {
    console.log("button was clicked")
    fetch('/api/users')
      .then((response) => response.json())
      .then((testing)=>{
        console.log(testing);
        setUsers(testing.users);
      });
  }
  useEffect(() => {
    fetch('/api/budget', {
      headers: { Authorization: localStorage.getItem('authToken') },
    })
      .then((response) => response.json())
      .then((data) => {
        setTotal(data.total_cash || 0);
        setBuckets(data.buckets || {});
      })
      .catch((error) => console.error('Error fetching budget:', error));
  }, []);


  return (
    <main className="container py-5">
      <Button onClick={handleClick}>Test</Button>
      <div>{users}</div>
      <div className="row">
        <div className="col-md-12">
          <h2>Total</h2>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              value={total}
              onChange={handleTotalChange}
              placeholder="Total Cash"
            />
          </div>
        </div>
      </div>

      <div className="row">
        {/* Bucket Breakdown Section */}
        {Object.keys(buckets).map((bucket) => (
          <Bucket
            key={bucket}
            label={bucket.charAt(0).toUpperCase() + bucket.slice(1)}
            value={buckets[bucket]}
            onChange={(value) => handleBucketChange(bucket, value)}
            progress={calculateProgress(buckets[bucket])}
          />
        ))}
      </div>

      <div className="mb-3">
        <h3>Leftover:</h3>
        <h5>${leftover}</h5>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary" onClick={goToPayments}>Go to Payments</button>
      </div>
    </main>
  );
}

function Bucket({ label, value, onChange, progress }) {
  return (
    <div className="col-md-4 col-sm-12">
      <div className="bucket p-4 mb-4">
        <span>{label}</span>
        <input 
          type="number" 
          className="form-control bucket-input" 
          placeholder="Enter Amount" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
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
