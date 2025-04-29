const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const parseContent = (filepath) => {
  const ext = path.extname(filepath).toLowerCase();
  const data = fs.readFileSync(filepath, 'utf-8');

  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }
  throw new Error(`Unknown file extension: ${ext}`);
};

module.exports = { parseContent };



