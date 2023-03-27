import { IConfig, IDependencyMap } from './types';
import { resolve } from './resolve';
import path from 'path';

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

if (require.main === module) {
  (async () => {
    const res = await analyzeDependencies({
      filePath: path.join(__dirname, 'fixtures/resolve/foo.tsx'),
      dependencies: ['./bar'],
      config: {},
    });
    console.log(res);
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
