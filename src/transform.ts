import { Loader, transform as esTransform } from 'esbuild';
import path from 'path';
import { init, parse } from 'cjs-module-lexer-rs';

// TODO: sourcemap
// TODO: await import() & code splitting
export async function transform(opts: {
  content: string;
  filePath: string;
}): Promise<{
  content: string;
  dependencies: string[];
}> {
  await init();
  const transformResult = await esTransform(opts.content, {
    tsconfigRaw: {},
    loader: getLoader(opts.filePath),
    sourcefile: opts.filePath,
    platform: 'browser',
    format: 'cjs',
  });
  const parseResult = parse(transformResult.code, opts.filePath);
  return {
    content: `${transformResult.code}`,
    dependencies: parseResult.imports,
  };
}

function getLoader(filePath: string) {
  const extname = path.extname(filePath);
  if (['.js', '.ts', '.jsx', '.tsx', '.css'].includes(extname)) {
    return extname.slice(1) as Loader;
  }
  return 'file';
}
