import { build } from './index';

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
