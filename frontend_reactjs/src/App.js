import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main App component containing entire layout with top nav, sidebar, footer, dashboard, forms, and authentication UI scaffolding.
 */
function App() {
  // Track current route/page (no router, simple state for now)
  const [page, setPage] = useState('dashboard');
  const [theme, setTheme] = useState('light');
  const [formState, setFormState] = useState({ name: '', email: '' });
  const [formMessage, setFormMessage] = useState('');
  // Auth states (UI only, no backend)
  const [authPage, setAuthPage] = useState('login');
  const [authValues, setAuthValues] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleNav = (target) => {
    setPage(target);
    setFormMessage('');
    setAuthError('');
  };

  // PUBLIC_INTERFACE
  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formState.name.trim() && formState.email.trim()) {
      setFormMessage('Form submitted successfully!');
      setFormState({ name: '', email: '' });
    } else {
      setFormMessage('Please fill out all fields.');
    }
  };

  // PUBLIC_INTERFACE
  const handleAuthChange = (e) => {
    setAuthValues({ ...authValues, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Simple UI validation only
    if (authValues.username.trim() && authValues.password.trim()) {
      setAuthError('');
      setFormMessage('Authentication not yet connected to backend.');
    } else {
      setAuthError('Both fields are required.');
    }
  };

  // Layout Components

  // PUBLIC_INTERFACE
  const TopNav = () => (
    <header className="top-nav">
      <span className="brand">
        <span className="brand-primary">React</span>
        <span className="brand-accent">UI</span>
      </span>
      <nav>
        <button className={"nav-btn" + (page === 'dashboard' ? ' active' : '')} onClick={() => handleNav('dashboard')}>
          Dashboard
        </button>
        <button className={"nav-btn" + (page === 'form' ? ' active' : '')} onClick={() => handleNav('form')}>
          Form
        </button>
        <button className={"nav-btn" + (page === 'auth' ? ' active' : '')} onClick={() => handleNav('auth')}>
          Auth
        </button>
      </nav>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </header>
  );

  // PUBLIC_INTERFACE
  const Sidebar = () => (
    <aside className="sidebar">
      <button className={"sidebar-btn" + (page === 'dashboard' ? ' active' : '')} onClick={() => handleNav('dashboard')}>
        <span role="img" aria-label="Dashboard">📊</span> Dashboard
      </button>
      <button className={"sidebar-btn" + (page === 'form' ? ' active' : '')} onClick={() => handleNav('form')}>
        <span role="img" aria-label="Form">📝</span> Form
      </button>
      <button className={"sidebar-btn" + (page === 'auth' ? ' active' : '')} onClick={() => handleNav('auth')}>
        <span role="img" aria-label="Auth">🔒</span> Auth
      </button>
    </aside>
  );

  // PUBLIC_INTERFACE
  const Footer = () => (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Minimal React UI. Powered by KAVIA.</span>
    </footer>
  );

  // Dashboard page
  // PUBLIC_INTERFACE
  const Dashboard = () => (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card card-primary">
          <div className="card-title">Welcome</div>
          <div className="card-value">👋</div>
          <div className="card-desc">
            Your modern, minimalistic dashboard is ready to use. <br />
            <span className="color-pill color-primary">Primary</span>
          </div>
        </div>
        <div className="card card-accent">
          <div className="card-title">Quick Action</div>
          <div className="card-value">⚡</div>
          <div className="card-desc">
            Access your forms and authentication from the menu.<br />
            <span className="color-pill color-accent">Accent</span>
          </div>
        </div>
        <div className="card card-secondary">
          <div className="card-title">Responsive</div>
          <div className="card-value">📱</div>
          <div className="card-desc">
            Try resizing for mobile!<br />
            <span className="color-pill color-secondary">Secondary</span>
          </div>
        </div>
      </div>
    </section>
  );

  // Form page
  // PUBLIC_INTERFACE
  const FormPage = () => (
    <section className="form-page">
      <h2>Sample Form</h2>
      <form className="simple-form" onSubmit={handleFormSubmit} autoComplete="off">
        <label>
          Name
          <input name="name" type="text" value={formState.name} onChange={handleFormChange} autoFocus />
        </label>
        <label>
          Email
          <input name="email" type="email" value={formState.email} onChange={handleFormChange} />
        </label>
        <button type="submit" className="btn-submit">Submit</button>
        {formMessage && <div className="form-message">{formMessage}</div>}
      </form>
    </section>
  );

  // Authentication UI (UI-only, not functional)
  // PUBLIC_INTERFACE
  const AuthPage = () => (
    <section className="auth-page">
      <h2>{authPage === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form className="auth-form" onSubmit={handleAuthSubmit} autoComplete="off">
        <label>
          Username
          <input name="username" type="text" value={authValues.username} onChange={handleAuthChange} />
        </label>
        <label>
          Password
          <input name="password" type="password" value={authValues.password} onChange={handleAuthChange} />
        </label>
        <button type="submit" className="btn-auth">{authPage === 'login' ? 'Login' : 'Sign Up'}</button>
        {authError && <div className="auth-error">{authError}</div>}
        {formMessage && <div className="auth-message">{formMessage}</div>}
      </form>
      <small>
        {authPage === 'login'
          ? <>Don't have an account? <button type="button" className="link-btn" onClick={() => setAuthPage('signup')}>Sign Up</button></>
          : <>Already have an account? <button type="button" className="link-btn" onClick={() => setAuthPage('login')}>Login</button></>
        }
      </small>
    </section>
  );

  // Main layout
  return (
    <div className="app-root">
      <TopNav />
      <div className="main-layout">
        <Sidebar />
        <main className="content-area">
          {page === 'dashboard' && <Dashboard />}
          {page === 'form' && <FormPage />}
          {page === 'auth' && <AuthPage />}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
