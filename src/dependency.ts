import { IConfig, IDependencyMap } from './types';
import { resolve } from './resolve';

export function analyzeDependencies(opts: {
  filePath: string;
  dependencies: string[];
  config: IConfig;
}) {
  const map: IDependencyMap = new Map();
  for (const dep of opts.dependencies) {
    const resolvedPath = resolve({
      filePath: opts.filePath,
      dependency: dep,
      config: opts.config,
    });
    map.set(dep, resolvedPath);
  }
  return map;
}
