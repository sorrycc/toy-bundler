import { build } from './index';

build({
  config: {
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  cwd: 'example',
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
