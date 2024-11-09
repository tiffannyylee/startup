import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Budget } from './budget/budget';
import { Payments } from './payments/payments';
import { AuthState } from './login/authState';


export default function App() {
  const [total, setTotal] = useState(0); // Example starting total
  const [buckets, setBuckets] = useState({
    bucket1: 0, // Rent
    bucket2: 0, // Groceries
    bucket3: 0, // Tuition
  });
  const [payments, setPayments] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="container-fluid">
          <nav className="navbar fixed-top navbar-dark bg-dark">
            <div className="navbar-brand">
              BudgetBucket<sup>&reg;</sup>
            </div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Login</NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/budget">Budget</NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/payments">Payments</NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
          />
          {/* Pass setTotal and setBuckets to Budget */}
          <Route
            path="/budget"
            element={
              <Budget 
                total={total} 
                setTotal={setTotal}  // Pass down setTotal
                buckets={buckets} 
                setBuckets={setBuckets}  // Pass down setBuckets
              />
            }
          />
          <Route
            path="/payments"
            element={
              <Payments
                total={total}
                setTotal={setTotal}
                buckets={buckets}
                setBuckets={setBuckets}
                payments={payments}
                setPayments={setPayments}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="bg-dark text-center p-3">
          <span className="text-reset">Tiffany Lee</span>
          <a href="https://github.com/tiffannyylee/startup" className="text-light ms-3" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center p-5">404: Return to sender. Address unknown.</main>;
}
