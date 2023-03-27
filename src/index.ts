import path from 'path';
import type { IConfig, IModule } from './types';
import { load } from './load';
import { transform } from './transform';
import { analyzeDependencies } from './dependency';
import { generate } from './generate';
import fs from 'fs';

export async function build(opts: {
  config: IConfig;
  cwd: string;
  output?: string;
}) {
  let globalId = 0;
  const modules = new Map<string, IModule>();
  const assets = new Map<string, string>();
  const cwd = path.resolve(opts.cwd || process.cwd());
  const entryPoint = path.join(cwd, 'index.tsx');
  const output = path.resolve(opts.output || path.join(cwd, 'dist'));

  // build
  const seen = new Set();
  const queue = [entryPoint];
  while (queue.length) {
    const module = queue.shift()!;
    if (seen.has(module)) {
      continue;
    }
    seen.add(module);
    let id = String(globalId);
    globalId += 1;

    // externals
    if (opts.config.externals?.[module]) {
      modules.set(module, {
        id,
        content: '/*external react*/',
        code: `module.exports = ${opts.config.externals?.[module]};`,
        dependencyMap: new Map(),
      });
      continue;
    }

    // load
    let content = load(module);

    // transform
    const transformResult = await transform({
      content,
      filePath: module,
    });

    // analyze dependencies + resolve
    const dependencyMap = analyzeDependencies({
      filePath: module,
      dependencies: transformResult.dependencies,
      config: opts.config,
    });

    const metaData = {
      id,
      content,
      code: transformResult.content,
      dependencyMap,
    };
    modules.set(module, metaData);
    queue.push(...dependencyMap.values());
  }

  // generate
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
  }
  const generateResult = generate(modules);
  fs.writeFileSync(path.join(output, 'index.js'), generateResult);

  // emit
  assets;

  console.log('✅');
}
