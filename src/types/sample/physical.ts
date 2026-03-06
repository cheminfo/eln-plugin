import type { TypeProcessor } from '../types.ts';

const physical: TypeProcessor = {
  jpath: ['physical'],
  getEmpty() {
    return {};
  },
};

export default physical;
