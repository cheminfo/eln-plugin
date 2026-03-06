import type { TypeProcessor } from '../types.ts';

const stock: TypeProcessor = {
  jpath: ['stock'],
  getEmpty() {
    return {};
  },
};

export default stock;
