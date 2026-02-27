const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

test('eslint is installed', () => {
  const eslintPkg = require('eslint/package.json');
  assert(eslintPkg.version.startsWith('9.'));
});

test('.eslintrc.json exists', () => {
  const configPath = path.join(__dirname, '..', '.eslintrc.json');
  assert(fs.existsSync(configPath));
});

test('.eslintrc.json is valid JSON', () => {
  const configPath = path.join(__dirname, '..', '.eslintrc.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  assert(config);
});

test('config has env settings', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config.env);
  assert(config.env.node === true);
});

test('config extends eslint:recommended', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config.extends === 'eslint:recommended');
});

test('config has rules', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(config.rules);
  assert(config.rules.semi);
  assert(config.rules.quotes);
});

test('config has ignorePatterns', () => {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.eslintrc.json'), 'utf8'));
  assert(Array.isArray(config.ignorePatterns));
  assert(config.ignorePatterns.includes('node_modules/'));
});

test('source files exist', () => {
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'server.js')));
  assert(fs.existsSync(path.join(__dirname, '..', 'src', 'utils.js')));
});

test('server module exports', () => {
  const server = require('../src/server');
  assert(typeof server.createServer === 'function');
  assert(typeof server.startServer === 'function');
});

test('utils module exports', () => {
  const utils = require('../src/utils');
  assert(typeof utils.formatDate === 'function');
  assert(typeof utils.slugify === 'function');
  assert(typeof utils.deepClone === 'function');
});

test('formatDate works', () => {
  const { formatDate } = require('../src/utils');
  const result = formatDate('2024-01-15');
  assert(result === '2024-01-15');
});

test('slugify works', () => {
  const { slugify } = require('../src/utils');
  assert(slugify('Hello World') === 'hello-world');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
