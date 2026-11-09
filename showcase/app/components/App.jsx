const initialSettings = { name: "M.O.B Signal demo", region: "Singapore" };
function loadSettings() {
  try {
    const v = JSON.parse(localStorage.getItem("mob-demo-settings"));
    return v && typeof v.name === "string" && typeof v.region === "string" ? v : initialSettings;
  } catch {
    return initialSettings;
  }
}
function DemoDialog({ dialog, onClose, onCreate, onReset, returnFocus }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const element = ref.current;
    element.showModal();
    return () => {
      element.close();
      returnFocus?.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className="console-dialog" aria-labelledby="demo-dialog-title" onCancel={onClose} onClose={onClose}>
 <h2 id="demo-dialog-title">{dialog.kind === "create" ? "Create sample deployment" : dialog.kind === "reset" ? "Reset demo settings" : "Inspect sample deployment"}</h2>
 {dialog.kind === "create" ? <form className="console-form" onSubmit={(e) => {
    e.preventDefault();
    onCreate(new FormData(e.currentTarget));
  }}>
 <div className="field"><label htmlFor="deployment-name" className="field-label">Deployment name</label><input autoFocus required maxLength="64" pattern="[a-z0-9-]+" title="Use lowercase letters, numbers and hyphens" id="deployment-name" name="name" className="input-field" /><p className="field-hint">Lowercase letters, numbers and hyphens. Sample data stays in this page.</p></div>
 <div className="console-actions"><button className="btn btn-primary">Create sample deployment</button><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button></div></form> : dialog.kind === "reset" ? <><p>Reset the saved demo name and region in this browser. No service or deployment is deleted.</p><div className="console-actions"><button autoFocus className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-danger" onClick={onReset}>Reset demo settings</button></div></> : <><p>{dialog.row.name}</p><dl><dt>Environment</dt><dd>{dialog.row.env}</dd><dt>Commit</dt><dd className="commit-hash">{dialog.row.commit}</dd><dt>Status</dt><dd>{dialog.row.status}</dd></dl><button autoFocus className="btn btn-secondary" onClick={onClose}>Close</button></>}
 </dialog>;
}
function App() {
  const [tab, setTab] = React.useState("Overview"), [filter, setFilter] = React.useState(""), [rows, setRows] = React.useState(window.DEMO_DEPLOYMENTS);
  const [saved, setSaved] = React.useState(loadSettings), [draft, setDraft] = React.useState(saved), [toast, setToast] = React.useState(""), [dialog, setDialog] = React.useState(null);
  const openerRef = React.useRef(null);
  const open = (value) => {
    openerRef.current = document.activeElement;
    setDialog(value);
  };
  const close = () => setDialog(null);
  const save = (e) => {
    e.preventDefault();
    const next = { name: draft.name.trim(), region: draft.region };
    if (!next.name) {
      e.currentTarget.querySelector("input").focus();
      return;
    }
    try {
      localStorage.setItem("mob-demo-settings", JSON.stringify(next));
      setSaved(next);
      setToast("Demo settings saved in this browser.");
    } catch {
      setToast("The browser could not save the settings. Allow local storage and try again.");
    }
  };
  return <main><header className="kit-head"><p className="kit-eyebrow">Interactive sample · local data</p><h1 className="kit-title">Service console</h1><p className="kit-lead">Explore shared controls, deployment filtering and keyboard interaction. These examples do not connect to real infrastructure.</p></header>
 <div className="app-container"><window.AppNav active={tab} onSelect={setTab} onDeploy={() => open({ kind: "create" })} /><div className="app-body">
 {(tab === "Overview" || tab === "Deployments") && <>{tab === "Overview" && <window.MetricsRow rows={rows} />}<window.DeploymentTable rows={rows} filter={filter} onFilterChange={setFilter} onAction={(row) => open({ kind: "inspect", row })} /></>}
 {tab === "Audit logs" && <window.AuditFeed />}
 {tab === "Edge clusters" && <section className="card-box"><h2 className="card-box-title">Edge clusters</h2><p>No cluster source is connected to this demo.</p><button className="btn btn-secondary" onClick={() => open({ kind: "create" })}>Create sample deployment</button></section>}
 {tab === "Settings" && <section className="card-box"><h2 className="card-box-title">Demo settings</h2><form className="console-form" onSubmit={save}>
 <div className="field"><label className="field-label" htmlFor="project-name">Project name</label><input className="input-field" id="project-name" required maxLength="80" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} aria-describedby="name-hint" /><p className="field-hint" id="name-hint">Stored in this browser only. Do not enter secrets.</p></div>
 <div className="field"><label className="field-label" htmlFor="region">Example region</label><select id="region" className="input-field" value={draft.region} onChange={(e) => setDraft({ ...draft, region: e.target.value })}><option>Singapore</option><option>Frankfurt</option><option>Virginia</option></select></div>
 <div className="console-actions"><button className="btn btn-primary">Save changes</button><button type="button" className="btn btn-secondary" onClick={() => {
    setDraft(saved);
    setToast("Unsaved changes discarded.");
  }}>Discard changes</button><button type="button" className="btn btn-ghost" onClick={() => {
    setDraft(saved);
    setTab("Overview");
  }}>Cancel</button><button type="button" className="btn btn-danger" onClick={() => open({ kind: "reset" })}>Reset demo settings</button></div>
 </form></section>}
 </div></div><p className="kit-foot" lang="vi">Mẫu tiếng Việt: Đã cập nhật cấu hình. Nguyễn Đặng — kiểm tra dấu, khoảng cách và nội dung dài. Dùng phím Tab để chuyển giữa các điều khiển.</p>
 <div role="status" aria-live="polite">{toast && <div className="console-toast"><p>{toast}</p><button className="btn btn-ghost" onClick={() => setToast("")}>Dismiss</button></div>}</div>
 {dialog && <DemoDialog dialog={dialog} returnFocus={openerRef.current} onClose={close} onCreate={(data) => {
    const name = String(data.get("name"));
    if (rows.some((r) => r.name === name)) {
      setToast("A sample deployment already uses that name.");
      return;
    }
    setRows([...rows, { name, env: "Staging", branch: "demo", commit: "0000000", status: "Pending", variant: "neutral", latency: "\u2014", action: "Inspect" }]);
    close();
    setTab("Deployments");
    setFilter("");
    setToast("Sample deployment added for this session.");
  }} onReset={() => {
    try {
      localStorage.removeItem("mob-demo-settings");
      setSaved(initialSettings);
      setDraft(initialSettings);
      close();
      setToast("Demo settings reset.");
    } catch {
      setToast("The browser could not reset stored settings.");
    }
  }} />}
 </main>;
}
window.App = App;
