import { Link } from 'react-router-dom'
import './DashboardPage.css'

const stats = [
  { label: 'Total Builds', value: '0', color: 'var(--text-primary)' },
  { label: 'API Calls (mo)', value: '0', color: 'var(--text-primary)' },
  { label: 'Success Rate', value: '-', color: 'var(--text-primary)' },
  { label: 'Storage', value: '0 MB', color: 'var(--text-primary)' },
]

function DashboardPage() {
  return (
    <div className="dashboard container">
      {/* Header */}
      <header className="dash-header animate-fade-in-up">
        <div>
          <h1 className="font-headline-xl dash-title">My Extensions</h1>
          <p className="dash-subtitle">Manage and deploy your custom AI-powered web extensions.</p>
        </div>
        <Link to="/generator" className="btn btn-primary btn-lg" id="create-new-btn">
          <span className="material-symbols-outlined">add_circle</span>
          <span>Create New Extension</span>
        </Link>
      </header>

      {/* Extension Grid (Empty State) */}
      <div className="dash-grid">
        <Link to="/generator" className="dash-empty animate-fade-in-up stagger-1" id="new-concept-card">
          <div className="dash-empty-icon">
            <span className="material-symbols-outlined">add</span>
          </div>
          <h4 className="font-headline-md dash-empty-title">Start a new project</h4>
          <p className="font-body-sm dash-empty-desc">Describe your ideal extension and let Extensio.ai generate it for you.</p>
        </Link>
      </div>

      {/* Account Activity */}
      <section className="dash-stats-section animate-fade-in-up stagger-2">
        <h2 className="font-headline-md dash-stats-heading">Account Activity</h2>
        <div className="dash-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="card dash-stat-card">
              <p className="font-label-caps dash-stat-label">{stat.label}</p>
              <p className="dash-stat-value" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
