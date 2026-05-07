import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/pricing', label: 'Pricing' },
    { to: '#', label: 'Docs' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">Extensio.ai</Link>
          <nav className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="navbar-actions">
          <div className="navbar-right">
            <Link to="/login" className={`navbar-link ${isActive('/login') ? 'active' : ''}`}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Sign up
            </Link>
          </div>

          <div className="navbar-controls">
            {/* Subtle Theme Toggle */}
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="navbar-hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`navbar-mobile-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="navbar-mobile-actions">
            <Link to="/login" className="navbar-mobile-link" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link to="/signup" className="btn btn-primary btn-full" onClick={() => setMobileOpen(false)}>Sign up</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
