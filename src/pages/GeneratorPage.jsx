import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './GeneratorPage.css'

const tabs = [
  { name: 'manifest.json', icon: 'description', active: true },
  { name: 'content.js', icon: 'javascript', active: false },
  { name: 'styles.css', icon: 'style', active: false },
]

const codeFiles = {
  'manifest.json': `{
  "manifest_version": 3,
  "name": "Extensio BTC Converter",
  "version": "1.0.0",
  "description": "Converts fiat prices to BTC in real-time.",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["styles.css"]
    }
  ],
  "action": {
    "default_popup": "popup.html"
  }
}`,
  'content.js': `// Content Script — BTC Price Converter
const BTC_API = 'https://api.coindesk.com/v1/bpi/currentprice.json';

async function fetchBTCPrice() {
  const res = await fetch(BTC_API);
  const data = await res.json();
  return data.bpi.USD.rate_float;
}

function findPriceElements() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const priceRegex = /\\$[\\d,]+\\.?\\d*/g;
  const matches = [];

  while (walker.nextNode()) {
    if (priceRegex.test(walker.currentNode.textContent)) {
      matches.push(walker.currentNode);
    }
  }
  return matches;
}

async function convertPrices() {
  const btcPrice = await fetchBTCPrice();
  const elements = findPriceElements();

  elements.forEach(el => {
    const usd = parseFloat(
      el.textContent.replace(/[\\$,]/g, '')
    );
    const btc = (usd / btcPrice).toFixed(8);
    el.textContent = \`₿ \${btc}\`;
  });
}

convertPrices();`,
  'styles.css': `/* Extensio BTC Converter — Injected Styles */

.extensio-highlight {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  padding: 2px 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  color: #1D4ED8;
  transition: background 0.2s ease;
}

.extensio-highlight:hover {
  background: rgba(59, 130, 246, 0.2);
}

.extensio-tooltip {
  position: absolute;
  background: #FFFFFF;
  border: 1px solid #E4E4E7;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  color: #09090B;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  pointer-events: none;
}`,
}

function GeneratorPage() {
  const [activeTab, setActiveTab] = useState('manifest.json')
  const navigate = useNavigate()

  return (
    <div className="generator">
      {/* Left Panel */}
      <section className="gen-sidebar">
        <div className="gen-sidebar-header animate-slide-in-left">
          <div className="gen-status">
            <span className="material-symbols-outlined gen-status-icon" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <span className="font-label-caps gen-status-text">Your extension is ready!</span>
          </div>
          <h1 className="font-headline-md gen-title">Generation Result</h1>
          <p className="font-body-sm gen-desc">Review the generated code assets for your browser extension based on your custom requirements.</p>
        </div>

        <div className="gen-prompt-card animate-slide-in-left stagger-1">
          <span className="font-label-caps gen-prompt-label">Original Prompt</span>
          <div className="gen-prompt-text">
            "Build a chrome extension that highlights all price tags on any e-commerce website and converts them to Bitcoin values based on the current market rate."
          </div>
        </div>

        <div className="gen-actions animate-slide-in-left stagger-2">
          <button className="btn btn-primary btn-full" id="download-zip-btn" onClick={() => alert('Downloading zip...')}>
            <span className="material-symbols-outlined">download</span>
            Download .zip
          </button>
          <button className="btn btn-ghost btn-full" id="regenerate-btn" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined">refresh</span>
            Regenerate
          </button>
        </div>

        <div className="gen-extension-info animate-slide-in-left stagger-3">
          <div className="gen-ext-badge">
            <div className="gen-ext-icon">
              <span className="material-symbols-outlined" style={{ color: 'var(--secondary)' }}>extension</span>
            </div>
            <div>
              <div className="gen-ext-name">BTC Converter v1.0.0</div>
              <div className="font-label-caps gen-ext-updated">Last updated: Just now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Panel — Code Viewer */}
      <section className="gen-code-panel animate-fade-in">
        {/* Tabs */}
        <div className="gen-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`gen-tab ${activeTab === tab.name ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.name)}
            >
              <span className="material-symbols-outlined gen-tab-icon">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Code */}
        <div className="gen-code-body">
          <pre className="font-code gen-code-content">{codeFiles[activeTab]}</pre>
        </div>

        {/* Status Bar */}
        <div className="gen-statusbar">
          <div className="gen-statusbar-left">
            <div className="gen-sync">
              <span className="gen-sync-dot"></span>
              <span className="font-label-caps">Live Sync Enabled</span>
            </div>
            <span className="font-label-caps">UTF-8</span>
          </div>
          <div className="gen-statusbar-right">
            <button className="gen-copy-btn" title="Copy code" onClick={() => { navigator.clipboard.writeText(codeFiles[activeTab]); alert('Copied to clipboard!') }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>content_copy</span>
            </button>
            <span className="font-label-caps">{activeTab.split('.').pop().toUpperCase()}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GeneratorPage
