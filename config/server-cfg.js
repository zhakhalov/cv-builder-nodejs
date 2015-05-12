module.exports = {
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 1337,
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1'
};