'use strict';

const yeoman = require('yeoman-environment');
const { AutoAdapter } = require('../index.');
const generatorName = 'chrome-ext:app';
const fs = require('fs');
const path = require('path');

const silent = true;

const variants = [
  {
    name: 'test',
    answers: {
      'appName': 'test',
      'appVersion': '1.0',
    }
  },
  {
    name: 'test2',
    answers: {
      'appName': 'test2',
      'appVersion': '2.1',
    }
  }
];

const runGenerator = (name, answers) => {
  const folder = path.join(__dirname, '..', name);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  const adapter = new AutoAdapter(answers, silent);
  const env = yeoman.createEnv([], { cwd: folder }, adapter);
  env.register(require.resolve('generator-chrome-ext'), generatorName);
  return new Promise((resolve, reject) => {
    console.log('Start generating', name);
    const onError = (err) => {
      console.log('Error generating', name, err);
      reject(err);
    };
    const generator = env.create(generatorName, { args: [], options: { silent } });
    if (generator instanceof Error) {
      return onError(generator);
    }
    generator.on('error', onError);
    generator.run(() => {
      console.log('Finished generating', name);
      resolve();
    });
  });
};

console.log('Start generating');
const promises = [];
variants.forEach(variant => {
  promises.push(runGenerator(variant.name, variant.answers));
});
Promise.all(promises)
  .then(() => {
    console.log('Finished generating');
    process.exit(0);
  })
  .catch(() => {
    console.log('Error generating');
    process.exit(1);
  });

