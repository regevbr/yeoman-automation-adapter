# yeoman-automation-adapter

Yeoman automation adapter for creating automatic responses to user prompts.
Used when creating automations to run yeoman without user interaction

Installtion
---------
```shell
npm install yeoman-automation-adapter
```

Usage
---------
```javascript
const yeoman = require('yeoman-environment');
const { AutoAdapter } = require('yeoman-automation-adapter');
const answers = {
  'appName': 'test',
  'appVersion': '1.0',
};
const silent = false;
const adapter = new AutoAdapter(answers, silent);
const env = yeoman.createEnv([], {}, adapter);
env.run(...);
```

Examples
---------
Please see examples dir for fully automated example
