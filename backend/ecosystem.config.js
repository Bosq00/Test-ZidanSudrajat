module.exports = {
  apps: [{
    script: 'index.js',
    name: 'mobile_api',
    args: 'start',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 8080    }
  }],
};
