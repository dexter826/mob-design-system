const DEPLOYMENTS = [
  { name: 'auth-service-v3', env: 'Production', branch: 'main', commit: 'fa981c2', status: 'Operational', variant: 'success', latency: '12ms', action: 'Inspect' },
  { name: 'graphql-gateway', env: 'Production', branch: 'main', commit: '8b40ef1', status: 'Operational', variant: 'success', latency: '18ms', action: 'Inspect' },
  { name: 'worker-indexer-asia', env: 'Staging', branch: 'feat/v4-cache', commit: '29d10a4', status: 'Rebalancing', variant: 'warning', latency: '42ms', action: 'Scale' },
  { name: 'storage-sync-daemon', env: 'Production', branch: 'main', commit: '91e70c8', status: 'Operational', variant: 'success', latency: '9ms', action: 'Inspect' },
];

window.DEMO_DEPLOYMENTS = DEPLOYMENTS;

function DeploymentTable({ rows: deployments, filter, onFilterChange, onAction }) {
  const rows = deployments.filter((d) => {
    const q = (filter || '').trim().toLowerCase();
    return !q || [d.name,d.env,d.branch,d.commit,d.status].some(value=>value.toLowerCase().includes(q));
  });

  return (
    <section aria-labelledby="deployments-title">
      <div className="panel-head">
        <div className="panel-title" id="deployments-title">Sample deployments</div>
        <div className="panel-tools">
          <label className="field" style={{ gap: 0 }}>
            <span className="field-label">
              Filter deployments
            </span>
            <input
              type="text"
              className="input-field input-compact"
              placeholder="Name, branch or commit"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
            />
          </label>

        </div>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Deployment name</th>
              <th scope="col">Environment</th>
              <th scope="col">Git branch</th>
              <th scope="col">Commit</th>
              <th scope="col">Status</th>
              <th scope="col" className="numeric">Latency</th>
              <th scope="col" className="numeric">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.name}>
                <td style={{ fontWeight: 600 }}>{d.name}</td>
                <td>{d.env}</td>
                <td><span className="commit-hash">{d.branch}</span></td>
                <td className="commit-hash">{d.commit}</td>
                <td><window.StatusBadge variant={d.variant}>{d.status}</window.StatusBadge></td>
                <td className="numeric">{d.latency}</td>
                <td className="numeric">
                  <button type="button" className="btn btn-secondary btn-compact" onClick={() => onAction(d)}>
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
            {!rows.length && (
              <tr><td colSpan={7} style={{ color: 'var(--color-text-secondary)' }}>No deployment matches this filter. Clear the filter to show all samples.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

window.DeploymentTable = DeploymentTable;
