import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

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

export default parseContent;



