import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate login
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-wrapper animate-fade-in-up">
        <div className="login-card card">
          {/* Header */}
          <div className="login-header">
            <h1 className="font-headline-md login-title">Welcome back</h1>
            <p className="font-body-sm login-subtitle">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="font-label-caps form-label" htmlFor="login-email">Email</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">mail</span>
                <input
                  className="input input-with-icon"
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="font-label-caps form-label" htmlFor="login-password">Password</label>
                <a href="#" className="form-forgot">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="input input-with-icon"
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button className="btn btn-primary btn-full btn-lg" type="submit" id="login-submit">
              <span>Login</span>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
            </button>

            {/* Divider */}
            <div className="login-divider">
              <div className="login-divider-line"></div>
              <span className="font-label-caps login-divider-text">OR CONTINUE WITH</span>
              <div className="login-divider-line"></div>
            </div>

            {/* Social Login */}
            <div className="social-grid">
              <button className="social-btn" type="button">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>terminal</span>
                <span>GitHub</span>
              </button>
              <button className="social-btn" type="button">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cloud</span>
                <span>Google</span>
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="login-footer">
            <p className="font-body-sm">
              Don't have an account?
              <Link to="/signup" className="login-signup-link">Sign up</Link>
            </p>
          </div>
        </div>

        {/* Version Tag */}
        <div className="login-version">
          <span className="font-code">AUTH_STABLE_v2.0.4</span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
