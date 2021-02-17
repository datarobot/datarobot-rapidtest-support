const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api/sites', { target: 'http://localhost:4000' })
  );
  app.use(
    createProxyMiddleware('/api/accounts', { target: 'http://localhost:4000' })
  );
  app.use(
    createProxyMiddleware('/schools', {
      target: 'http://localhost:1337',
      changeOrigin: true,
    })
  );
};
