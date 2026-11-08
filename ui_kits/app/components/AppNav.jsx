const APP_TABS = ['Overview', 'Deployments', 'Edge clusters', 'Audit logs', 'Settings'];

function AppNav({ active = 'Overview', onSelect, onDeploy }) {
  return (
    <div className="app-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--mob-signal-space-5)', flexWrap: 'wrap' }}>
        <div className="app-brand">
          <img src="../../logos/mob-logo/vectors/mob-symbol.svg" width="24" height="24" alt="" aria-hidden="true" />
          <span>M.O.B Signal</span>
        </div>
        <nav className="app-tabs" aria-label="Platform sections">
          {APP_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className="console-nav-tab"
              aria-current={tab === active ? 'page' : undefined}
              onClick={() => onSelect(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="app-nav-actions">
        <span className="sample-label">Sample data</span>
        <button type="button" className="btn btn-primary btn-compact" onClick={onDeploy}>
          <svg className="mob-icon mob-icon--16" aria-hidden="true"><use href="../../assets/icons/icons.svg#i-deploy"></use></svg>
          New deployment
        </button>
      </div>
    </div>
  );
}

window.AppNav = AppNav;
