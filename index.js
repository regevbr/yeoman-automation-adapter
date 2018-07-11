'use strict';

const logger = require('yeoman-environment/lib/util/log');
const inquirer = require('inquirer');

function DummyPrompt(answers, q) {
  this.answers = answers;
  this.question = q;
}

DummyPrompt.prototype.run = function() {
  let answer = this.answers[this.question.name];
  let isSet;
  switch (this.question.type) {
    case 'list':
      isSet = answer !== undefined;
      break;
    case 'confirm':
      isSet = answer || answer === false;
      break;
    default:
      isSet = !!answer;
  }
  if (!isSet) {
    answer = this.question.default;
    if (answer === undefined && this.question.type === 'confirm') {
      answer = true;
    }
  }
  return Promise.resolve(answer);
};

function AutoAdapter(answers) {
  answers = answers || {};
  this.promptModule = inquirer.createPromptModule();
  Object.keys(this.promptModule.prompts).forEach(function(promptName) {
    this.promptModule.registerPrompt(promptName, DummyPrompt.bind(DummyPrompt, answers));
  }, this);
}

AutoAdapter.prototype.diff = function() {
  return 'Diff issues, please run manually to resolve';
};

AutoAdapter.prototype.log = logger();

AutoAdapter.prototype.prompt = function(questions, cb) {
  const promise = this.promptModule(questions);
  promise.then(cb || undefined);
  return promise;
};

module.exports = {
  AutoAdapter: AutoAdapter
};
