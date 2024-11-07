import React from 'react';
import './budget.css'

export function Budget() {
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
                <input type="number" id="totalInput" className="form-control" placeholder="Enter Total Cash" required />
              </div>
              <div>
                <span>Leftover:</span>
                <input type="text" id="leftover" className="form-control d-inline-block w-50" placeholder="Calculated Leftover" readonly />
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-12">
          <h2>Buckets</h2>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="bucket p-4 mb-4" id="bucket1">
                <img src="images/house.png" alt="Rent Icon" style={{ width: '20px', height: '20px' }} />
                <span>Rent</span>
                <input type="number" className="form-control bucket-input" placeholder="Enter Amount" />
                {/* <!-- Progress bar for Rent bucket --> */}
                <div className="progress mt-3">
                <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">50%</div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="bucket p-4 mb-4" id="bucket2">
                <img src="images/food.png" alt="Groceries Icon" style={{ width: '20px', height: '20px' }} />
                <span>Groceries</span>
                <input type="number" className="form-control bucket-input" placeholder="Enter Amount" />
                {/* <!-- Progress bar for Groceries bucket --> */}
                <div className="progress mt-3">
                  <div className="progress-bar" role="progressbar" style={{width: '30%' }} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30%</div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="bucket p-4 mb-4" id="bucket3">
                <img src="images/tuition.jpeg" alt="Tuition Icon" style={{ width: '20px', height: '20px' }} />
                <span>Tuition</span>
                <input type="number" className="form-control bucket-input" placeholder="Enter Amount" />
                {/* <!-- Progress bar for Tuition bucket --> */}
                <div className="progress mt-3">
                  <div className="progress-bar" role="progressbar" style={{width: '80%'}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">80%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Add Bucket and Share --> */}
        <div className="col-md-12">
          <button type="button" className="btn btn-primary mb-3">Add new bucket</button>
          <form method="get" action="payment.html" className="d-inline-block">
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