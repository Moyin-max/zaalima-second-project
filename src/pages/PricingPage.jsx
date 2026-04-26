import { Link, useNavigate } from 'react-router-dom'
import './PricingPage.css'

const freePlan = {
  name: 'Free',
  desc: 'For side projects and testing.',
  price: '₹0',
  features: [
    { text: 'Basic extensions', available: true },
    { text: 'Limited generations (10/mo)', available: true },
    { text: 'Community support', available: true },
    { text: 'API call support', available: false },
  ],
  cta: 'Get Started',
  highlight: false,
}

const proPlan = {
  name: 'Pro',
  desc: 'For professional workloads.',
  price: '₹999',
  features: [
    { text: 'Complex permissions', available: true },
    { text: 'API call support', available: true },
    { text: 'Unlimited generations', available: true },
    { text: 'Early access to new features', available: true },
    { text: 'Priority e-mail support', available: true },
  ],
  cta: 'Upgrade to Pro',
  highlight: true,
}

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: 'Yes, you can upgrade or downgrade your plan at any time from your account settings.',
  },
  {
    q: 'What counts as a "Generation"?',
    a: 'A generation is any single request made to our AI inference engine through an extension or the API.',
  },
  {
    q: 'Do you offer educational discounts?',
    a: 'Absolutely. Reach out to our support team with your .edu email for special pricing.',
  },
]

function PricingPage() {
  const navigate = useNavigate()

  return (
    <div className="pricing container">
      {/* Hero */}
      <header className="pricing-hero animate-fade-in-up">
        <h1 className="font-headline-xl pricing-heading">Scalable pricing for engineers.</h1>
        <p className="font-body-base pricing-subheading">
          Build and deploy AI extensions with zero friction. Choose the plan that scales with your request volume and complexity.
        </p>
      </header>

      {/* Pricing Grid */}
      <div className="pricing-grid">
        {[freePlan, proPlan].map((plan) => (
          <div key={plan.name} className={`card pricing-card ${plan.highlight ? 'pricing-card-highlight' : ''} animate-fade-in-up ${plan.highlight ? 'stagger-2' : 'stagger-1'}`}>
            {plan.highlight && (
              <div className="pricing-badge">Recommended</div>
            )}
            <div className="pricing-card-content">
              <div className="pricing-card-header">
                <h3 className="font-headline-md pricing-plan-name">{plan.name}</h3>
                <p className="font-body-sm pricing-plan-desc">{plan.desc}</p>
              </div>

              <div className="pricing-price">
                <span className="font-headline-xl pricing-amount">{plan.price}</span>
                <span className="pricing-period">/mo</span>
              </div>

              <ul className="pricing-features">
                {plan.features.map((f) => (
                  <li key={f.text} className={`pricing-feature ${!f.available ? 'disabled' : ''}`}>
                    <span className="material-symbols-outlined pricing-feature-icon">
                      {f.available ? 'check_circle' : 'block'}
                    </span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('/signup')}
              className={`btn btn-full btn-lg ${plan.highlight ? 'btn-primary pricing-btn-glow' : 'btn-ghost'}`}
              id={`pricing-${plan.name.toLowerCase()}-btn`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Bento Info Section */}
      <section className="pricing-info-grid">
        <div className="card pricing-info-large">
          <div className="pricing-info-content">
            <h4 className="font-headline-md pricing-info-title">Enterprise Grade Security</h4>
            <p className="pricing-info-desc">
              Need custom contracts, SLA, or on-prem deployment? Our enterprise team is ready to assist with high-volume requirements.
            </p>
            <button className="btn pricing-sales-btn" id="talk-to-sales-btn" onClick={() => alert('Contacting sales...')}>Talk to Sales</button>
          </div>
          <div className="pricing-info-decoration">
            <span className="material-symbols-outlined pricing-shield-icon">shield</span>
          </div>
        </div>

        <div className="card pricing-info-small">
          <div className="pricing-info-small-icon">
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '36px' }}>terminal</span>
          </div>
          <h4 className="font-headline-md pricing-info-title">Developer Docs</h4>
          <p className="font-body-sm pricing-info-desc">Integrate our SDK in minutes with comprehensive documentation.</p>
          <a href="#" className="pricing-docs-link">View SDK docs →</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <h2 className="font-headline-md pricing-faq-heading">Frequently Asked Questions</h2>
        <div className="pricing-faq-list">
          {faqs.map((faq) => (
            <div key={faq.q} className="pricing-faq-item">
              <h5 className="pricing-faq-q">{faq.q}</h5>
              <p className="pricing-faq-a font-body-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PricingPage
