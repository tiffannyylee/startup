import React from 'react';

export function Payments() {
  return (
    <main className="container mt-5 pt-5">
      <div className="bg-white p-4 shadow rounded">
        <h2>Payments</h2>
        <form>
          <div className="mb-3">
            <label for="amount" className="form-label">Enter a new purchase:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                id="amount"
                placeholder="Amount"
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="bucket" className="form-label">Select a bucket:</label>
            <select className="form-select" id="bucket" name="buckets" required>
              <option value="bucket1">Bucket 1</option>
              <option value="bucket2">Bucket 2</option>
              <option value="bucket3">Bucket 3</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="date" className="form-label">Date of purchase:</label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Date"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit Payment</button>
        </form>
      </div>
    </main>
  );
}