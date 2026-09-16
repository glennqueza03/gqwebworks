import { useEffect, useState } from "react";

const PROJECT_TYPE_LABELS = {
  website: "Website Development",
  redesign: "Website Redesign",
  automation: "Automation",
  "web-app": "Web Application",
  other: "Other",
};

function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Login failed.");
      }

      onSuccess();
    } catch (err) {
      setStatus("idle");
      setError(err.message);
    }
  }

  async function handleForgotPassword() {
    setError("");
    try {
      const response = await fetch("/api/admin/request-reset", { method: "POST" });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not send reset email.");
      setResetSent(true);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">GQWebworks · Admin</p>
        <h1>Sign in</h1>
        <div className="form-group">
          <label htmlFor="admin-username">Username</label>
          <input
            id="admin-username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cta-dark" disabled={status === "loading"}>
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
        {error && (
          <p className="form-status form-status-error" role="alert">
            {error}
          </p>
        )}
        {resetSent ? (
          <p className="form-status form-status-success" role="status">
            Check gqwebworks@gmail.com for a reset link.
          </p>
        ) : (
          <button type="button" className="admin-forgot" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        )}
      </form>
    </div>
  );
}

function ProjectForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    type: "",
    color: "#214845",
    category: "demo",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Could not add project.");
      }

      setForm({
        name: "",
        url: "",
        description: "",
        type: "",
        color: "#214845",
        category: "demo",
      });
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form className="admin-project-form" onSubmit={handleSubmit}>
      <h3>Add a project</h3>
      <div className="admin-form-grid">
        <div className="form-group">
          <label htmlFor="p-name">Name*</label>
          <input
            id="p-name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-url">Live URL*</label>
          <input
            id="p-url"
            type="url"
            value={form.url}
            onChange={(e) => update("url", e.target.value)}
            placeholder="https://example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-type">Type label</label>
          <input
            id="p-type"
            value={form.type}
            onChange={(e) => update("type", e.target.value)}
            placeholder="e.g. Business presence"
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-color">Accent color</label>
          <input
            id="p-color"
            type="color"
            value={form.color}
            onChange={(e) => update("color", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="p-category">Section</label>
          <select
            id="p-category"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="demo">Live demos</option>
            <option value="side">Side projects</option>
          </select>
        </div>
        <div className="form-group admin-form-span">
          <label htmlFor="p-description">Description</label>
          <textarea
            id="p-description"
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="cta-dark" disabled={status === "loading"}>
        {status === "loading" ? "Adding…" : "Add project"}
      </button>
      {error && (
        <p className="form-status form-status-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

function ProjectRow({ project, onDeleted }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Delete "${project.name}"?`)) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/portfolio?id=${encodeURIComponent(project.id)}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Could not delete project.");
      }
      onDeleted();
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  }

  return (
    <li className="admin-project-row">
      <span className="admin-project-swatch" style={{ background: project.color }} />
      <div className="admin-project-info">
        <strong>{project.name}</strong>
        <span>{project.type || "—"}</span>
        <a href={project.url} target="_blank" rel="noreferrer">
          {project.url}
        </a>
      </div>
      <button
        type="button"
        className="admin-delete-btn"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "…" : "Delete"}
      </button>
    </li>
  );
}

function PortfolioTab() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const response = await fetch("/api/portfolio");
      const result = await response.json();
      setData(result);
    } catch {
      setError("Could not load portfolio.");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="admin-panel">
      <ProjectForm onCreated={load} />
      {error && <p className="form-status form-status-error">{error}</p>}
      {!data ? (
        <p className="admin-empty">Loading…</p>
      ) : (
        <>
          <h3>Live demos ({data.demos.length})</h3>
          <ul className="admin-project-list">
            {data.demos.map((p) => (
              <ProjectRow key={p.id} project={p} onDeleted={load} />
            ))}
            {data.demos.length === 0 && <p className="admin-empty">No projects yet.</p>}
          </ul>
          <h3>Side projects ({data.sideProjects.length})</h3>
          <ul className="admin-project-list">
            {data.sideProjects.map((p) => (
              <ProjectRow key={p.id} project={p} onDeleted={load} />
            ))}
            {data.sideProjects.length === 0 && <p className="admin-empty">No projects yet.</p>}
          </ul>
        </>
      )}
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((result) => setMessages(result.messages || []))
      .catch(() => setError("Could not load messages."));
  }, []);

  if (error) return <p className="form-status form-status-error">{error}</p>;
  if (!messages) return <p className="admin-empty">Loading…</p>;
  if (messages.length === 0) return <p className="admin-empty">No messages yet.</p>;

  return (
    <ul className="admin-message-list">
      {messages.map((m) => (
        <li key={m.id} className={`admin-message ${openId === m.id ? "is-open" : ""}`}>
          <button
            type="button"
            className="admin-message-head"
            onClick={() => setOpenId(openId === m.id ? null : m.id)}
          >
            <span>
              <strong>{m.name}</strong>
              <small>{m.email}</small>
            </span>
            <span className="admin-message-meta">
              {PROJECT_TYPE_LABELS[m.projectType] || m.projectType || "—"} · {m.submittedAt}
            </span>
          </button>
          {openId === m.id && (
            <div className="admin-message-body">
              {m.company && (
                <p>
                  <strong>Company:</strong> {m.company}
                </p>
              )}
              {m.phone && (
                <p>
                  <strong>Phone:</strong> {m.phone}
                </p>
              )}
              <p className="admin-message-text">{m.message}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Admin() {
  const [authState, setAuthState] = useState("checking");
  const [tab, setTab] = useState("portfolio");

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((result) => setAuthState(result.authenticated ? "authed" : "anon"))
      .catch(() => setAuthState("anon"));
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("anon");
  }

  if (authState === "checking") {
    return (
      <main className="subpage admin-page">
        <p className="admin-empty">Loading…</p>
      </main>
    );
  }

  if (authState === "anon") {
    return (
      <main className="subpage admin-page">
        <LoginForm onSuccess={() => setAuthState("authed")} />
      </main>
    );
  }

  return (
    <main className="subpage admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">GQWebworks · Admin</p>
          <h1>Dashboard</h1>
        </div>
        <button type="button" className="admin-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="tab-buttons admin-tabs">
        <button
          className={`tab-button ${tab === "portfolio" ? "active" : ""}`}
          onClick={() => setTab("portfolio")}
        >
          Portfolio
        </button>
        <button
          className={`tab-button ${tab === "messages" ? "active" : ""}`}
          onClick={() => setTab("messages")}
        >
          Messages
        </button>
      </div>

      {tab === "portfolio" ? <PortfolioTab /> : <MessagesTab />}
    </main>
  );
}
