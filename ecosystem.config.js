module.exports = {
  apps : [{
    name: 'VTCODE.VN/CMS',
    script: 'serve',
    cwd: '.',
    instances: 1,
    exec_mode: 'cluster',
    watch: ['dist'],
    env: {
	PORT: 8081,
        PM2_SERVE_PORT: 8081,
	PM2_SERVE_PATH: './dist',
	PM2_SERVE_SPA: 'true',
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
