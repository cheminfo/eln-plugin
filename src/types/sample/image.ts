import { basenameFind, getTargetProperty } from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const image: TypeProcessor = {
  jpath: ['image'],
  find: basenameFind,
  getProperty: getTargetProperty,
};

export default image;
