import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Budget } from './budget/budget';
import { Payments } from './payments/payments';

export default function App() {
  return (
  //<div className='body bg-dark text-light'>App will display here</div>
  <BrowserRouter>
  <div className="app-container">
    <header className="container-fluid">
      <nav className="navbar fixed-top navbar-dark bg-dark">
      <div className='navbar-brand'>
      BudgetBucket<sup>&reg;</sup>
          </div>
        <menu className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link active" to="">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/budget">Budget</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/payments">Payments</NavLink>
          </li>
        </menu>
      </nav>
    </header>
    <Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/budget' element={<Budget />} />
  <Route path='/payments' element={<Payments />} />
  <Route path='*' element={<NotFound />} />
</Routes>
    <footer className='bg-dark'>
        <span className="text-reset">Tiffany Lee</span>
        <NavLink to="https://github.com/tiffannyylee/startup">GitHub</NavLink>
      </footer>
    </div>
    </BrowserRouter>
  );

}
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }