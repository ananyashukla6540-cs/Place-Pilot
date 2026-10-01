
import { useState } from "react";
import "./Auth.css";

function Auth({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const endpoint = isRegister ? "register" : "login";

      const body = isRegister
        ? { name, email, password }
        : { email, password };

      const response = await fetch(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isRegister) {
        setMessage("Registration successful! You can now log in.");
        setIsRegister(false);
        setPassword("");
      } else {
        if (!data.token || !data.user) {
          throw new Error("Invalid login response from server");
        }

        sessionStorage.setItem("authToken", data.token);
        sessionStorage.setItem("authUser", JSON.stringify(data.user));

        onAuthSuccess(data.user);
      }
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Backend se connection nahi ho pa raha. Check that the server is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">P</div>
          <div>
            <h1>PlacePilot</h1>
            <p>AI PLACEMENT ERP</p>
          </div>
        </div>

        <div className="auth-heading">
          <h2>{isRegister ? "Create Student Account" : "Welcome back!"}</h2>
          <p>
            {isRegister
              ? "Register to explore placement opportunities."
              : "Sign in to continue to your workspace."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={
                isRegister
                  ? "At least 8 characters"
                  : "Enter your password"
              }
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={isRegister ? 8 : undefined}
              maxLength={72}
              required
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : isRegister
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>

        <div className="auth-switch">
          {isRegister
            ? "Already have an account?"
            : "Don't have a student account?"}

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
              setMessage("");
            }}
          >
            {isRegister ? "Sign In" : "Register"}
          </button>
        </div>

        <p className="auth-note">
          Student registration is open. Admin accounts are created separately
          by the system administrator.
        </p>
      </div>
    </div>
  );
}

export default Auth;