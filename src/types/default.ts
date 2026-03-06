import type { TypeProcessor } from './types.ts';

const defaultType: TypeProcessor = {
  jpath: [],
  process() {
    return {};
  },

  getEmpty() {
    return [];
  },
};

export default defaultType;
