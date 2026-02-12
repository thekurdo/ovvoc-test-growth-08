const http = require('http');

const PORT = process.env.PORT || 3000;

function createServer() {
  const server = http.createServer((req, res) => {
    const { method, url } = req;
    console.log(`${method} ${url}`);

    if (url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    if (url === '/api/users' && method === 'GET') {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
      return;
    }

    res.writeHead(404);
    res.end('Not Found');
  });

  return server;
}

function startServer() {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  return server;
}

module.exports = { createServer, startServer };
