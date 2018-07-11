'use strict';

const yeoman = require('yeoman-environment');
const { AutoAdapter } = require('../index.');
const generatorName = 'chrome-ext:app';
const fs = require('fs');
const path = require('path');

const variants = [
  {
    folder: 'test',
    answers: {
      'appName': 'test',
      'appVersion': '1.0',
    }
  },
  {
    folder: 'test2',
    answers: {
      'appName': 'test2',
      'appVersion': '2.1',
    }
  }
];

const runGenerator = (folder, answers) => {
  folder = path.join(__dirname, '..', folder);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  const adapter = new AutoAdapter(answers);
  const env = yeoman.createEnv([], { cwd: folder }, adapter);
  env.register(require.resolve('generator-chrome-ext'), generatorName);
  return new Promise((resolve, reject) => {
    console.log('Start generating', folder);
    env.run(generatorName, (err) => {
      if (err) {
        console.log('Error generating', folder, err);
        reject(err);
      } else {
        console.log('Finished generating', folder);
        resolve();
      }
    });
  });
};

console.log('Start generating');
const promises = [];
variants.forEach(variant => {
  promises.push(runGenerator(variant.folder, variant.answers));
});
Promise.all(promises)
  .then(() => {
    console.log('done');
  });

