
const http  = require('node:http');
const { readFileSync } = require('node:fs');

http.createServer((req, res) => {
  if (req.url === '/metrics') {
    try {
        const path = require('node:path');
        const file = path.resolve(__dirname, '..', 'metrics.prom');   // <repo>/metrics.prom
        const txt  = readFileSync(file, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/plain; version=0.0.4' });
        res.end(txt);
    } catch (err) {
        console.error('metrics_server:', err.message);
        res.writeHead(503).end('# metrics not generated yet – ' + err.message + '\n');
    }
  } else {
    res.writeHead(404).end();
  }
}).listen(9464, () => console.log('▶ metrics on :9464/metrics'));