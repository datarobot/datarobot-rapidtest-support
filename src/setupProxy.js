const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/api/maintenance/v1/sites', '/api/maintenance/v1/proctors'],
    createProxyMiddleware({
      target: 'https://app.warapidtest.org',
      changeOrigin: true,
    })
  );
  app.use(
    '/schools',
    createProxyMiddleware({
      target: 'http://localhost:1337/api',
      changeOrigin: true,
    })
  );
};
