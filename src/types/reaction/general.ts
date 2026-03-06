import type { TypeProcessor } from '../types.ts';

const reactionGeneral: TypeProcessor = {
  jpath: [],
  getEmpty() {
    return {
      code: '',
      date: Date.now(),
      procedure: '',
      products: [],
      reagents: [],
      conditions: '',
      meta: {},
      remarks: '',
      title: '',
      reactionRXN: '$RXN\n\n\n\n  0  0\n',
    };
  },
};

export default reactionGeneral;
