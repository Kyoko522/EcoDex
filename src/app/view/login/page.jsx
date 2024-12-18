import { login, signup } from './actions';
import './login.css';

export default function LoginPage() {
  return (
    <div className="login-container">
      <h1 className="login-title">Welcome to EcoDex!</h1>
      <form>
        {/* Email Input */}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="login-input"
          required
        />

        {/* Password Input */}
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          className="login-input"
          required
        />

        {/* Login Button */}
        <button formAction={login} className="login-button">
          Log In
        </button>

        {/* Signup Button */}
        <button formAction={signup} className="login-button" style={{ marginTop: '1rem' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}