import { basenameFind, getTargetProperty } from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const video: TypeProcessor = {
  jpath: ['video'],
  find: basenameFind,
  getProperty: getTargetProperty,
};

export default video;
