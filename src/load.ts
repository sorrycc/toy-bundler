import fs from 'fs';

export function load(module: string) {
  return fs.readFileSync(module, 'utf-8');
}
