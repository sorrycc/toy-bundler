import type { IConfig } from './types';
import path from 'path';
import { sync as resolveSync } from 'resolve';

export function resolve(opts: {
  filePath: string;
  dependency: string;
  config: IConfig;
}) {
  const dep = opts.dependency;
  // handle externals first
  if (opts.config.externals?.[dep]) {
    return dep;
  }
  return resolveSync(dep, {
    basedir: path.dirname(opts.filePath),
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  });
}
