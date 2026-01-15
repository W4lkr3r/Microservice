const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// TODO: Create a proxy rule
// If request starts with /api/auth, send it to http://localhost:3001
app.use('/api/auth', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,

}));
app.use('/api/tickets', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
}));

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});