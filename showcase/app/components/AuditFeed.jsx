const AUDIT_ENTRIES = [
  { time: '14:02:18', actor: 'mia.okafor@mobsignal', action: 'Deployed auth-service-v3 to Production', commit: 'fa981c2', variant: 'success', status: 'Operational' },
  { time: '13:47:55', actor: 'ci-runner-04', action: 'Scaled worker-indexer-asia to 8 replicas', commit: '29d10a4', variant: 'warning', status: 'Rebalancing' },
  { time: '13:19:02', actor: 'linh.tran@mobsignal', action: 'Promoted graphql-gateway from Staging', commit: '8b40ef1', variant: 'success', status: 'Operational' },
  { time: '12:58:41', actor: 'ci-runner-01', action: 'Rolled back storage-sync-daemon to previous build', commit: '91e70c8', variant: 'info', status: 'Rolled back' },
];

function AuditFeed() {
  return (
    <section aria-labelledby="audit-title">
      <div className="panel-head">
        <div className="panel-title" id="audit-title">Audit log</div>
        <span className="kbd">/ to jump to a service</span>
      </div>
      <div className="table-wrap">
        {AUDIT_ENTRIES.map((e) => (
          <div className="audit-item" key={e.time + e.actor}>
            <span className="audit-time">{e.time}</span>
            <span className="audit-actor">{e.actor}</span>
            <span className="audit-action">
              {e.action} <span className="commit-hash">{e.commit}</span>
            </span>
            <window.StatusBadge variant={e.variant}>{e.status}</window.StatusBadge>
          </div>
        ))}
      </div>
    </section>
  );
}

window.AuditFeed = AuditFeed;
