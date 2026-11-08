function MetricsRow({ rows }) {
  const metrics = [["Sample deployments", rows.length], ["Operational", rows.filter((r) => r.status === "Operational").length], ["Production", rows.filter((r) => r.env === "Production").length], ["Staging", rows.filter((r) => r.env === "Staging").length]];
  return <div className="stats-row">{metrics.map(([label, value]) => <div className="stat-cell" key={label}><div className="stat-label">{label}</div><div className="stat-number">{value}</div><div className="stat-trend secondary">Local sample data</div></div>)}</div>;
}
window.MetricsRow = MetricsRow;
