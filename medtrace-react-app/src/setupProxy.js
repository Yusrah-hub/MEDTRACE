const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://medtrace-l2k9.onrender.com',
      changeOrigin: true,
      secure: false,
    })
  );
};
