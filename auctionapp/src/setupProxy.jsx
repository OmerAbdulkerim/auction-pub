const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

    const addOriginHeader = (request) => {
        request.setHeader("origin", 'http://backend:8080');
    }

    app.use(
        '/backend/api',
        createProxyMiddleware({
            target: 'http://backend:8080',
            changeOrigin: true,
            onProxyReq: addOriginHeader
        })
    );
};
