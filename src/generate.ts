import { getRuntime, wrapModule } from './runtime';
import { IModule } from './types';

export function generate(modules: Map<string, IModule>) {
  const results = Array.from(modules.values()).map((m) => {
    const { id, code } = m;
    let newCode = code;
    for (const [name, path] of m.dependencyMap) {
      const dependency = modules.get(path)!;
      newCode = newCode.replace(
        new RegExp(`require\\(('|")${name.replace(/[\/.]/g, '\\$&')}\\1\\)`),
        `require(${dependency.id})`,
      );
    }
    return wrapModule(id, newCode);
  });
  return [getRuntime(), ...results, 'requireModule(0);'].join('\n');
}
