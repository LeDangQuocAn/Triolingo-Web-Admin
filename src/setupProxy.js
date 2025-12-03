const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy any /api/* requests to backend (which mounts auth routes under /api/auth)
    app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://98.94.144.216:5001',
      changeOrigin: true,
      secure: false,
    })
  );
  // Proxy only admin API endpoints (avoid proxying SPA routes like /admin/default)
    app.use(
    '/admin/stats',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_BASE || 'http://98.94.144.216:5001',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    })
  );
};
