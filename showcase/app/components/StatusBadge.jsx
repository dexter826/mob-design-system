function StatusBadge({ variant = 'neutral', children }) {
  return (
    <span className={`badge badge-${variant}`}>
      <span className="badge-dot" aria-hidden="true"></span>
      {children}
    </span>
  );
}

window.StatusBadge = StatusBadge;
