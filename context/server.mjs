import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
export const root = path.resolve(fileURLToPath(new URL('../', import.meta.url)));
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.ico':'image/x-icon','.md':'text/plain; charset=utf-8'};
export function createServer() {
  return http.createServer((req,res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const decoded = decodeURIComponent(url.pathname);
      const filename = path.resolve(root, '.' + decoded.replaceAll('\\','/'));
      const relative = path.relative(root, filename);
      if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(p=>p.startsWith('.') || p==='node_modules')) {
        res.writeHead(403);res.end('Forbidden');return;
      }
      const file = fs.statSync(filename).isDirectory() ? path.join(filename,'index.html') : filename;
      const actual=fs.realpathSync(file);
      const actualRelative=path.relative(fs.realpathSync(root),actual);
      if(actualRelative.startsWith('..')||path.isAbsolute(actualRelative)){res.writeHead(403);res.end('Forbidden');return;}
      res.writeHead(200, {'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
      fs.createReadStream(file).pipe(res);
    } catch { res.writeHead(404);res.end('Not found'); }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server=createServer();
  server.on('error',error=>{console.error(error.message);process.exitCode=1;});
  server.listen(4173,'127.0.0.1',()=>console.log('M.O.B Signal: http://127.0.0.1:4173/ (Ctrl+C to stop)'));
}
