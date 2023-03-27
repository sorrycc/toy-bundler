import path from 'path';
import type { IModule } from './types';
import { load } from './load';
import { transform } from './transform';
import { analyzeDependencies } from './dependency';
import { generate } from './generate';

export async function build() {
  let id = 0;
  const modules = new Map<string, IModule>();
  const cwd = process.cwd();
  const entryPoint = path.join(cwd, 'example', 'index.tsx');

  // build
  const seen = new Set();
  const queue = [entryPoint];
  while (queue.length) {
    const module = queue.shift()!;
    if (seen.has(module)) {
      continue;
    }
    seen.add(module);

    // load
    let content = load(module);

    // transform
    const transformResult = await transform({ content, filePath: module });

    // analyze dependencies + resolve
    const dependencyMap = analyzeDependencies({
      filePath: module,
      dependencies: transformResult.dependencies,
    });

    const metaData = {
      id: String(id++),
      content,
      code: transformResult.content,
      dependencyMap,
    };
    modules.set(module, metaData);
    queue.push(...dependencyMap.values());
  }

  // generate
  const generateResult = generate(modules);
  console.log(generateResult);
}
