const allowedOrigins = ['http://192.236.146.201:5000'];

if (process.env.NODE_ENV) {
  allowedOrigins.push('http://localhost:3000');
  allowedOrigins.push('http://localhost:5000');
}

module.exports = allowedOrigins;
