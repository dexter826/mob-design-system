// Align known compatibility exports with canonical semantic roles.
// Unknown colors fail the build. This does not modify the host generator.
import fs from 'node:fs';

const tokenData = JSON.parse(fs.readFileSync('tokens.measured.json','utf8'));
const roleValue = name => { const token = tokenData.color[name] || tokenData.engineRoles[name]; return token.aliasOf ? roleValue(token.aliasOf) : token.value; };
const ROLE_MAP = [
  [
    "color-primary",
    "colorPrimary",
    "primary"
  ],
  [
    "color-primary-hover",
    "colorPrimaryHover",
    "primary-hover"
  ],
  [
    "color-primary-active",
    "colorPrimaryActive",
    "primary-active"
  ],
  [
    "color-primary-bg",
    "colorPrimaryBg",
    "primary-subtle"
  ],
  [
    "color-primary-bg-hover",
    "colorPrimaryBgHover",
    "primary-subtle"
  ],
  [
    "color-primary-border",
    "colorPrimaryBorder",
    "border-strong"
  ],
  [
    "color-primary-border-hover",
    "colorPrimaryBorderHover",
    "border-strong"
  ],
  [
    "color-primary-text",
    "colorPrimaryText",
    "primary"
  ],
  [
    "color-success",
    "colorSuccess",
    "success"
  ],
  [
    "color-success-bg",
    "colorSuccessBg",
    "primary-subtle"
  ],
  [
    "color-success-border",
    "colorSuccessBorder",
    "border-strong"
  ],
  [
    "color-success-hover",
    "colorSuccessHover",
    "primary-hover"
  ],
  [
    "color-success-active",
    "colorSuccessActive",
    "primary-active"
  ],
  [
    "color-warning",
    "colorWarning",
    "warning"
  ],
  [
    "color-warning-bg",
    "colorWarningBg",
    "surface"
  ],
  [
    "color-warning-border",
    "colorWarningBorder",
    "border-strong"
  ],
  [
    "color-warning-hover",
    "colorWarningHover",
    "warning"
  ],
  [
    "color-warning-active",
    "colorWarningActive",
    "warning"
  ],
  [
    "color-error",
    "colorError",
    "error"
  ],
  [
    "color-error-bg",
    "colorErrorBg",
    "surface"
  ],
  [
    "color-error-border",
    "colorErrorBorder",
    "border-strong"
  ],
  [
    "color-error-hover",
    "colorErrorHover",
    "error"
  ],
  [
    "color-error-active",
    "colorErrorActive",
    "error"
  ],
  [
    "color-info",
    "colorInfo",
    "info"
  ],
  [
    "color-info-bg",
    "colorInfoBg",
    "surface"
  ],
  [
    "color-info-border",
    "colorInfoBorder",
    "border-strong"
  ],
  [
    "color-info-hover",
    "colorInfoHover",
    "info"
  ],
  [
    "color-info-active",
    "colorInfoActive",
    "info"
  ],
  [
    "color-link",
    "colorLink",
    "info"
  ],
  [
    "color-link-hover",
    "colorLinkHover",
    "info"
  ],
  [
    "color-link-active",
    "colorLinkActive",
    "info"
  ],
  [
    "color-text",
    "colorText",
    "foreground"
  ],
  [
    "color-text-secondary",
    "colorTextSecondary",
    "text-secondary"
  ],
  [
    "color-text-tertiary",
    "colorTextTertiary",
    "text-secondary"
  ],
  [
    "color-text-quaternary",
    "colorTextQuaternary",
    "muted"
  ],
  [
    "color-border",
    "colorBorder",
    "control-border"
  ],
  [
    "color-border-secondary",
    "colorBorderSecondary",
    "surface-subtle"
  ],
  [
    "color-fill",
    "colorFill",
    "surface-hover"
  ],
  [
    "color-fill-secondary",
    "colorFillSecondary",
    "surface-subtle"
  ],
  [
    "color-fill-tertiary",
    "colorFillTertiary",
    "surface"
  ],
  [
    "color-fill-quaternary",
    "colorFillQuaternary",
    "surface"
  ],
  [
    "color-bg-layout",
    "colorBgLayout",
    "background"
  ],
  [
    "color-bg-container",
    "colorBgContainer",
    "surface"
  ],
  [
    "color-bg-elevated",
    "colorBgElevated",
    "surface-elevated"
  ]
];
const ROLES = ROLE_MAP.map(([css,key,role])=>[css,key,roleValue(role)]);

// Derived literals with no token of their own. Neutral charcoal steps are left
// alone because their role is not recoverable from the hex alone.
// Each row maps a hex the engine derived from some seed onto the measured value it should be.
// A seed change produces new derived hexes, so an unmapped one is reported at the end of the run
// rather than passed over silently.
const LITERALS = [
  ['092115', '#121212'], ['43d079', '#00e065'], ['1a914c', '#00b853'],
  ['083b1f', '#181818'], ['124828', '#383838'], ['156737', '#383838'], ['6fe699', '#00e065'],
  ['24da60', '#00cc5c'], ['4be779', '#00e065'], ['1ea94c', '#00b853'],
  ['1fba60', '#00cc5c'],
  ['092915', '#121212'], ['08471f', '#181818'], ['135428', '#383838'],
  ['187837', '#383838'], ['9ef8b3', '#00cc5c'],
  ['31cf6d', '#00cc5c'], ['092516', '#121212'], ['18502d', '#383838'],
  ['5ae78c', '#00e065'], ['28a156', '#00b853'],
  ['daa02d', '#f59e0b'], ['281b09', '#121212'], ['543f16', '#383838'],
  ['e7ba54', '#f59e0b'], ['a97c25', '#f59e0b'],
  ['d86460', '#ef4444'], ['270f10', '#121212'], ['532a28', '#383838'],
  ['e7918b', '#ef4444'], ['a74f4c', '#ef4444'],
  ['56b6da', '#38bdf8'], ['0e1f28', '#121212'], ['254754', '#383838'],
  ['7fcde7', '#38bdf8'], ['448da9', '#38bdf8'],
  ['cbcbcb', '#ededed'], ['9e9e9e', '#a1a1a1'], ['707070', '#737373'],
  ['74f396', '#00e065'], ['e2fae6', '#00cc5c'], ['e2fae8', '#00cc5c'], ['9ef8bb', '#00cc5c'],
  // kit fill swatches: antd's 5-step neutral ramp onto the 5 measured steps.
  ['131313', '#121212'], ['1c1c1c', '#181818'], ['252525', '#202020'],
  ['333333', '#222222'], ['434343', '#262626'],
];

// antd ships a 10-step preset scale per hue (blue-6 #1677ff, red-1..10, …).
// Nothing in the pages consumes it and no value is in the brand set, so the
// declarations are dead off-brand literals; the brand publishes one accent.
const PRESETS = /[;\s]*--brand-presets-[a-z]+-[0-9]+:\s*#[0-9a-f]{6};?/gi;

// No saturated green admits light ink: #ffffff on the accent measures 2.14:1 and #ededed
// 1.83:1, both failing at any size. The brand fixes #000000 as the only
// ink allowed on the accent, so the swap is scoped to that fill alone.
const ON_ACCENT = /style="[^"]*background:\s*var\(--brand-color-primary\)[^"]*"/g;

// The archive publishes one radius: 0px, no per-component override. antd still
// derives small/large steps, and the kit swatches consume them.
const SHAPES = [
  ['borderRadius', 'border-radius', '0'],
  ['borderRadiusXS', 'border-radius-xs', '0'],
  ['borderRadiusSM', 'border-radius-sm', '0'],
  ['borderRadiusLG', 'border-radius-lg', '0'],
];

const argv = process.argv.slice(2);
const split = argv.indexOf('--');
const explicit = split < 0 ? argv : [...argv.slice(0, split), ...argv.slice(split + 1)];
const files = explicit.length ? explicit : ['brand.html', ...fs.readdirSync('system',{recursive:true}).filter(p=>/\.(?:json|css|html)$/.test(p)).map(p=>'system/'+p)].filter(p=>!p.endsWith('seed.json')&&!p.endsWith('theme.json')); 

// Generated pages embed the brand prose as it was in brand.json when they were written, so a
// registry change leaves stale copy behind. Re-assert it from the current brand.json. Each
// anchor is matched to the end of its text node, in both raw and escaped markup. brand.html is
// excluded: its copy lives in a single-line JSON payload, where the anchors have no text-node
// terminator, and `od brand preview` already renders that page from the current brand.json.
const brand = JSON.parse(fs.readFileSync('brand.json', 'utf8'));

const PROSE = [
  [/A dark-mode engineering design system[\s\S]*?(?=<|&lt;)/g, brand.description],
  [/One accent, used with intent[\s\S]*?(?=<|&lt;)/g, brand.voice.messagingPillars[0]],
  [/Getting deploy, provision, rollback[\s\S]*?(?=<|&lt;)/g,
   'Console interfaces bury status, spacing and focus under generic chrome.'],
];

// Icon geometry is part of the contract: a 24 grid, 1.5px stroke, butt caps and miter joins
// (BRAND.md 11). Generated pages ship round-capped 2.4px glyphs, which contradict it.
const ICON_GEOMETRY = [
  [/stroke-linecap="round"/g, 'stroke-linecap="butt"'],
  [/stroke-linejoin="round"/g, 'stroke-linejoin="miter"'],
  [/stroke-width="2\.4"/g, 'stroke-width="1.5"'],
];

// The values a deliverable may contain, plus the engine viewer chrome that BRAND.md 20 excludes
// from this script by design.
const CHROME = new Set([
  // brand.html panel, rules and status pill, plus its light-tile logic.
  'f4f6f8', 'dde3ea', 'e7ebf0', 'f0f0eb', 'f6f5ef', '3d7a4f', 'b4453a', 'd14c3f',
  '1a1a18', '57564f', '8a887f', 'f8fafc', 'c96442',
]);
const LEGAL = new Set([...Object.values(tokenData.color),...Object.values(tokenData.engineRoles)].map(v=>v.value.toLowerCase().replace('#','')).filter(v=>/^[0-9a-f]{6}$/.test(v)));
LEGAL.add('ffffff');
const stray = new Map();

for (const path of files) {
  const isJson = path.endsWith('.json');
  let text = fs.readFileSync(path, 'utf8');
  if (path === 'brand.html') {
    text = text.replace(/(<script id="od-brand-payload"[^>]*>)([\s\S]*?)(<\/script>)/, (_, head, body, tail) => {
      const payload = JSON.parse(body);
      if (payload.brand) payload.brand = brand;
      else if (payload.name && payload.colors) Object.assign(payload, brand);
      return head + JSON.stringify(payload).replace(/</g, '\\u003c') + tail;
    });
  }


  for (const [cssVar, jsonKey, value] of ROLES) {
    if (isJson) {
      text = text.replace(new RegExp(`("${jsonKey}"\\s*:\\s*)"[^"]*"`, 'g'), (_, head) => head + `"${value}"`);
    } else {
      text = text.replace(new RegExp(`(--brand-${cssVar}\\s*:\\s*)[^;}]*`, 'g'), (_, head) => head + value);
    }
  }

  for (const [jsonKey, cssVar, value] of SHAPES) {
    if (isJson) {
      text = text.replace(new RegExp(`("${jsonKey}"\\s*:\\s*)[^,}]+`, 'g'), (_, head) => head + value);
    } else {
      text = text.replace(new RegExp(`(--brand-${cssVar}\\s*:\\s*)[^;}]*`, 'g'), (_, head) => head + value + 'px');
    }
  }

  for (const [from, recordedTarget] of LITERALS) {
    const targetRoles = {"#00cc5c": "primary", "#00e065": "primary-hover", "#00b853": "primary-active", "#121212": "surface", "#181818": "surface-subtle", "#383838": "border-strong", "#f59e0b": "warning", "#ef4444": "error", "#38bdf8": "info", "#ededed": "foreground", "#a1a1a1": "text-secondary", "#737373": "muted", "#202020": "surface-elevated", "#222222": "surface-hover", "#262626": "border"};
    const to = roleValue(targetRoles[recordedTarget]);
    text = text.replace(new RegExp(`#${from}`, 'gi'), to);
  }



  if (isJson) {
    // 13 antd hue ramps x 10 steps that nothing consumes and no value of which
    // is in the brand set. The system publishes one accent, not a colour wheel.
    const obj = JSON.parse(text);
    if (obj.presets) { delete obj.presets; text = JSON.stringify(obj, null, 2); }
  } else {
    text = text.replace(ON_ACCENT, (attr) => attr.replace(/color:\s*#(?:fff|ffffff)\b/gi, 'color:#000000'));
    text = text.replace(PRESETS, '');
    text = text.replace(/<td\b[^>]*bgcolor="var\(--brand-color-primary\)"[\s\S]*?<\/td>/gi, block => block.replace(/color:\s*#fff(?:fff)?\b/gi, 'color:#000000'));
    text = text.replace(/style="[^"]*(?:background(?:-color)?|bgcolor):?[^"]*var\(--brand-color-primary\)[^"]*"/g, attr=>attr.replace(/color:\s*(?:#fff(?:fff)?|var\(--brand-color-text\))/gi,'color:#000000'));
    text = text.replace(/(<(?:a|td)\b[^>]*bgcolor="var\(--brand-color-primary\)"[^>]*style=")([^"]*)/gi,(_,head,style)=>head+style.replace(/color:\s*#[fF]{3,6}/g,'color:#000000'));
    text = text.replace(/stroke-linecap="round"/g,'stroke-linecap="butt"').replace(/stroke-linejoin="round"/g,'stroke-linejoin="miter"');

    if (path !== 'brand.html') {
      for (const [re, value] of PROSE) {
        text = text.replace(re, (match) => {
          // A match far longer than any brand sentence means the anchor ran past its text node.
          if (match.length > 2500) throw new Error(`prose anchor overran its text node in ${path}`);
          return value;
        });
      }
      for (const [from, to] of ICON_GEOMETRY) text = text.split(from).join(to);
    }
  }

  for (const m of text.matchAll(/#([0-9a-f]{6})\b/gi)) {
    const hex = m[1].toLowerCase();
    if (LEGAL.has(hex) || CHROME.has(hex)) continue;
    if (!stray.has(hex)) stray.set(hex, []);
    stray.get(hex).push(path);
  }

  if (fs.readFileSync(path, 'utf8') !== text) fs.writeFileSync(path, text);
  console.log(`${isJson ? 'json ' : 'css  '} ${path}`);
}

if (stray.size === 0) {
  console.log(`\nclean: every 6-digit hex literal in ${files.length} files is a brand value or viewer chrome.`);
} else {
  console.log(`\n${stray.size} hex literal(s) are in no LITERALS row and no brand role:`);
  for (const [hex, where] of stray) {
    console.log(`  #${hex}  in ${new Set(where).size} file(s): ${[...new Set(where)].slice(0, 3).join(', ')}`);
  }
  process.exitCode = 1;
  console.log('  A seed change makes the engine derive new values. Measure each one against');
  console.log('  tokens.measured.json, then add it to LITERALS; do not leave it in a live recipe.');
}
