module.exports = {
  /*apps : [{
    script: 'index.js',
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
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
  }*/
  apps: [
    {
      name: 'debo',
      script: 'pnpm',
      //args: 'run dev --host',
      args: 'run prod',
      env: {
        NODE_ENV: 'production',
      },
      env_file: '/data/app/debobardeur/.env',
      cwd: '/data/app/debobardeur',
      //user: 'deboba',
      error_file: '/data/logs/debo-err.log',
      out_file: '/data/logs/debo-out.log',
      merge_logs: true,
    },
  ],
};
