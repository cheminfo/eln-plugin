import { fromJcamp } from 'nmr-metadata';

import type { ContentData } from '../common.ts';
import {
  findBy,
  getExtension,
  getReference,
  getTargetProperty,
  getTextContent,
} from '../common.ts';
import type { TypeProcessor } from '../types.ts';

const isFid = /[^a-z]fid[^a-z]/i;
const replaceFid = /[^a-z]fid[^a-z]?/i;

const nmr: TypeProcessor = {
  find: findBy(getNmrReference),

  getProperty: (filename: string) => {
    const extension = getExtension(filename);
    if (
      (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') &&
      isFid.test(filename)
    ) {
      return 'jcampFID';
    }
    return getTargetProperty(filename);
  },

  process: (filename: string, content: ContentData) => {
    const extension = getExtension(filename);
    let metaData: Record<string, unknown> = {};
    if (extension === 'jdx' || extension === 'dx' || extension === 'jcamp') {
      const textContent = getTextContent(content);
      metaData = fromJcamp(textContent) as unknown as Record<string, unknown>;
    }
    return metaData;
  },

  jpath: ['spectra', 'nmr'],
};

export default nmr;

/**
 * An experiment is delivered as a FID and its Fourier transform, so the `fid`
 * marker is not part of its identity.
 * @param filename - The file path.
 * @returns The reference string.
 */
function getNmrReference(filename: string): string {
  const reference = getReference(filename);
  if (isFid.test(filename)) {
    return reference.replace(replaceFid, '');
  }
  return reference;
}
