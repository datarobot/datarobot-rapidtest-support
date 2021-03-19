const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/captcha', '/schools'],
    createProxyMiddleware({
      target: 'http://localhost:1337/api',
      changeOrigin: true,
    })
  );
  app.use(
    [
      '/api/maintenance/v1/sites',
      '/api/maintenance/v1/site',
      '/api/maintenance/v1/proctor',
      '/api/maintenance/v1/proctors',
    ],
    createProxyMiddleware({
      target: 'https://app.warapidtest.org',
      changeOrigin: true,
    })
  );
};
