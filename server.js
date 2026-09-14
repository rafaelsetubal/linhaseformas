const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8095;
const base = 'c:/Users/Rafael/Downloads/linhas-formas-site-v2/mnt/data/linhas-formas-site';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  const filePath = path.join(base, urlPath === '/' ? 'index.html' : urlPath);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime[ext] || 'application/octet-stream';
    const totalSize = stat.size;
    const rangeHeader = req.headers.range;

    if (rangeHeader && totalSize > 0) {
      // Range request (vital for video seeking/scrubbing in Chrome/Safari)
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = Math.max(0, parseInt(parts[0], 10) || 0);
      const end = parts[1] ? Math.min(totalSize - 1, parseInt(parts[1], 10)) : totalSize - 1;
      const chunkSize = Math.max(1, (end - start) + 1);

      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': totalSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(port, () => {
  console.log(`Dev server with HTTP Range support listening on http://localhost:${port}`);
});
