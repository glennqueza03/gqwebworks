import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminResetPassword() {
  const token = new URLSearchParams(window.location.search).get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Could not reset password.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  if (!token) {
    return (
      <main className="subpage admin-page">
        <div className="admin-login">
          <div className="admin-login-card">
            <h1>Invalid link</h1>
            <p>This reset link is missing its token. Request a new one from the admin login page.</p>
            <Link to="/admin" className="admin-forgot">
              Back to login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="subpage admin-page">
        <div className="admin-login">
          <div className="admin-login-card">
            <h1>Password updated</h1>
            <p>You can now sign in with your new password.</p>
            <Link to="/admin" className="admin-forgot">
              Go to login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="subpage admin-page">
      <div className="admin-login">
        <form className="admin-login-card" onSubmit={handleSubmit}>
          <p className="eyebrow">GQWebworks · Admin</p>
          <h1>Set a new password</h1>
          <div className="form-group">
            <label htmlFor="new-password">New password</label>
            <input
              id="new-password"
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              type="password"
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="cta-dark" disabled={status === "loading"}>
            {status === "loading" ? "Updating…" : "Update password"}
          </button>
          {error && (
            <p className="form-status form-status-error" role="alert">
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
