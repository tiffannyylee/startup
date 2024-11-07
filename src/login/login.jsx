import React from 'react';

export function Login() {
  return (
    <main className="container d-flex justify-content-center align-items-center vh-100">
    <div className="w-50">
      <h1 className="text-center">Welcome to BudgetBucket</h1>
      <form method="get" action="budget.html" class="mt-5">
        {/* <!-- Email Input --> */}
        <div className="input-group mb-3">
          <span className="input-group-text">@</span>
          <input
            className="form-control"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        {/* <!-- Password Input --> */}
        <div className="input-group mb-3">
          <span className="input-group-text">🔒</span>
          <input
            className="form-control"
            type="password"
            placeholder="password"
            required
          />
        </div>

        {/* <!-- Buttons --> */}
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Login</button>
          <button className="btn btn-secondary" type="button">Create Account</button>
        </div>
      </form>
    </div>
  </main>
  );
}