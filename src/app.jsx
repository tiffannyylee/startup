import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  //<div className='body bg-dark text-light'>App will display here</div>
  <div className="app-container">
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark bg-dark">
      <div className='navbar-brand'>
      BudgetBucket<sup>&reg;</sup>
          </div>
        <menu className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" href="index.html">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="budget.html">Budget</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="payment.html">Payments</a>
          </li>
        </menu>
      </nav>
    </header>
    <main className="container mt-5 pt-5">App components go here</main>
    <footer className='bg-dark'>
        <span className="text-reset">Tiffany Lee</span>
        <a href="https://github.com/tiffannyylee/startup">GitHub</a>
      </footer>
    </div>
  );

}