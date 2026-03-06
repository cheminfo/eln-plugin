import type { TypeProcessor } from '../types.ts';

const general: TypeProcessor = {
  jpath: ['general'],
  getEmpty() {
    return {
      description: '',
      title: '',
      name: [],
      mf: '',
      molfile: '',
      mw: 0,
      keyword: [],
      meta: {},
      sequence: '',
      kind: '',
    };
  },
};

export default general;
